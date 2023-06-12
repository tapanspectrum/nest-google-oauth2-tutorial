import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('AUTH_SERVICE') private readonly userservice: AuthService
    ) {
        super({
            clientID: '65333203019-jtihrjsj1sbrv7bj87e8b9jnkt28312n.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:3001/api/auth/google/redirect',
            scope: ['profile', 'email']

        })
    }

    async validate(accesstoken: string, refreshtoken: string, profile: Profile) {
        // console.log(accesstoken);
        // console.log(refreshtoken);
        // console.log(profile);
        const userdata = await this.userservice.validateUser({
            email: profile.emails[0].value,
            displayName: profile.displayName,
            picture: profile._json.picture
        })
        return userdata || null;
    }

}