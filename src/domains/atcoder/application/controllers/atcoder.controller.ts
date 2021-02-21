import { Controller, Get, Header, Param } from "@nestjs/common";
import { AtcoderService } from "@src/domains/atcoder/application/services/atcoder.service";

import { IData } from "../../domainModel/interface/atcoder.interface";

@Controller("ac")
export class AtcoderController {
    constructor(private atcoderService: AtcoderService) {}

    @Get(":handle")
    @Header("content-type", "application/json")
    async getUserInfo(@Param("handle") handle: string): Promise<string> {
        return this.atcoderService.getUserInfo(handle);
    }
}
