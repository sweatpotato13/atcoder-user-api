import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { User } from '@src/entities/userinfo.entity';
import { LoggerService } from '@src/shared/modules/logger/logger.service';
import scraper from "table-scraper";

import { UserInfoAggregate } from '../domainModel/aggregate/userinfo.aggregate';

@Injectable()
export class UserInfoService {
    constructor(private readonly userInfoManager: UserInfoAggregate,
        private readonly _logger: LoggerService) { }

    @Cron('0 */2 * * *')
    public async getUserInfo(): Promise<any> {
        let number = 1;
        let pageid = 1;
        try {
            console.log("start");
            while (pageid) {
                const data = await scraper.get(
                    `https://beta.atcoder.jp/ranking?page=${pageid}`
                );
                const table = data[1];
                if (table == undefined) {
                    break;
                }
                table.forEach(async element => {
                    let user: string = element.User;
                    if (user.indexOf("\n") != -1) {
                        user = user.substring(0, user.indexOf("\n"));
                        element.User = user;
                    }
                    if (element.Birth == "") element.Birth = 0;
                    else {
                        element.Birth = parseInt(element.Birth);
                    }
                    const data: User = {
                        id: number,
                        rank: parseInt(element.Rank),
                        user: user,
                        bitrh: element.Birth == "" ? 0 : parseInt(element.Birth),
                        rating: parseInt(element.Rating),
                        highest: parseInt(element.Highest),
                        match: parseInt(element.Match),
                        win: parseInt(element.Win),
                    }
                    const isExist = this.userInfoManager.findOne(data.user);
                    if (isExist) {
                        this.userInfoManager.deleteUser(data.user);
                    }
                    this.userInfoManager.saveUser(data);
                    number += 1;
                });
                this._logger.info("info", {
                    context: `Success to parse ranking page ${pageid}`
                });
                pageid += 1;
            }
            this._logger.info("info", {
                context: `Finish parsing`
            });
        } catch(err){
            this._logger.error("error", {
                context: `Failed to parse ranking ${number} : ${err.message}`
            });    
        }
    }
}
