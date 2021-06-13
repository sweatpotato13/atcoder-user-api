import { Controller, Get, Inject, Param } from "@nestjs/common";
import { IUserService } from "../domain/interfaces/user.interface";
import { ErrorResponse } from "@src/shared/models/responses";
import { ErrorCodes } from "@src/shared/constants";

@Controller("user")
export class UserController {
    constructor(
        @Inject("UserService") private readonly _service: IUserService
    ) {}

    @Get(":user")
    async getUserInfo(@Param("user") user: string): Promise<any> {
        try {
            const result = await this._service.getUserInfo(user);
            return result;
        } catch (err) {
            return new ErrorResponse(
                "There was an error reading user info",
                ErrorCodes.READ_ERROR,
                err
            );
        }
    }
}
