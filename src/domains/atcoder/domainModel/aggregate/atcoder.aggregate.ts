import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@src/entities/userinfo.entity";
import { LoggerService } from "@src/shared/modules/logger/logger.service";
import { Repository } from "typeorm";

@Injectable()
export class AtcoderAggregate {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private readonly _logger: LoggerService,
    ) {
        this.userRepository = userRepository;
    }
    /**
    * 특정 유저 조회
    * @param id
    */
    findOne(user: string): Promise<User> {
        return this.userRepository.findOne({ user: user });
    }

    async getUserInfo(handle: string): Promise<string> {
        try{
            const info = await this.findOne(handle);
            return JSON.stringify(info);    
        } catch(err){
            this._logger.error("error", {
                context: `Failed to getUserinfo ${handle} : ${err.message}`
            });    
        }
    }
}
