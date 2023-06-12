import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { User } from '../entities/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: AuthService
    ) {
        super();
    }

    serializeUser(user: User, done: Function) {
        //done function parameter is ist param denote to error 2nd paran denote userdata
        console.log('serializeUser');
        done(null, user)
    }

    async deserializeUser(payload: any, done: Function) {
       const user = await this.authService.findUser(payload.id);
       console.log('deserializeUser');
       console.log(user);
       return user ? done(null, user): done(null, null)
    }
}