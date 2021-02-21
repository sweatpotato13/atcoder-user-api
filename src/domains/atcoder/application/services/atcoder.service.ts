import { Injectable } from "@nestjs/common";
import { AtcoderAggregate } from "@src/domains/atcoder/domainModel/aggregate/atcoder.aggregate";

import { IData } from "../../domainModel/interface/atcoder.interface";

@Injectable()
export class AtcoderService {
    constructor(private readonly atcoderManager: AtcoderAggregate) {}

    public async getUserInfo(handle: string): Promise<string> {
        return await this.atcoderManager.getUserInfo(handle);
    }
}
