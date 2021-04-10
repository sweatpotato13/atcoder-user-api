import { Controller, Get, Header, Param } from "@nestjs/common";
import { AtcoderService } from "@src/domains/atcoder/application/services/atcoder.service";
import { LoggerService } from "@src/shared/modules/logger/logger.service";

@Controller("ac")
export class AtcoderController {
    constructor(private atcoderService: AtcoderService,
        private readonly _logger: LoggerService
    ) { }

    @Get(":handle")
    @Header("content-type", "application/json")
    async getUserInfo(@Param("handle") handle: string): Promise<string> {
        try {
            const res = this.atcoderService.getUserInfo(handle);
            return res;
        } catch (err) {
            this._logger.error("error", {
                context: `Failed to getUserInfo ${err.message}`
            });
        }
    }
}
