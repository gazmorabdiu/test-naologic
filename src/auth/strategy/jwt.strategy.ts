import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    const configService = new ConfigService();
    const prismaService = new PrismaService()
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('app.jwtSecret', { infer: true }),
    });
  }

  async validate(payload: any) {
    const { userId, email, role } = payload;
    return payload;
    // TODO: after you add models you should change these rows, it depends how and what you want
    // to return after user pass validation. Below you have an example
    // const user = await this.prismaService.user.findUnique({
    //   where: {
    //     id: userId,
    //     isActive: true,
    //   },
    // });
    // if (!user) {
    //   throw new NotFoundException('User Not Found');
    // }
    // return user;
  }
}
