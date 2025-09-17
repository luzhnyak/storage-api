import bcrypt from "bcrypt";
import { HttpError } from "../helpers";
import { TokenService } from "./tokenService";
import User from "../models/User";
import { IUser } from "../types/user";

export class AuthService {
  static async register(userObj: IUser) {
    const user = await User.findOne({ where: { email: userObj.email } });

    if (user) {
      throw new HttpError(409, "Email in use");
    }

    const passwordHash = await bcrypt.hash(userObj.password!, 10);

    const newUser = await User.create({
      ...userObj,
      passwordHash,
    });

    return { id: newUser.id, name: newUser.name, email: newUser.email };
  }

  static async login(userObj: IUser) {
    const user = await User.findOne({ where: { email: userObj.email } });

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    const isPasswordEquals = await bcrypt.compare(
      userObj.password!,
      user.passwordHash
    );

    if (!isPasswordEquals) {
      throw new HttpError(401, "Email or password is wrong");
    }

    return {
      token: TokenService.generateTokens({
        id: user.id!,
        name: user.name,
        email: user.email,
      }),
      user: { id: user.id, name: user.name, email: user.email },
    };
  }

  static async refresh(userObj: { id: number; name: string; email: string }) {
    const user = await User.findOne({ where: { email: userObj.email } });

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    return {
      token: TokenService.generateTokens({
        id: user.id!,
        name: user.name,
        email: user.email,
      }),
      user: { id: user.id, name: user.name, email: user.email },
    };
  }

  static async logout() {
    return "User successfully logged out";
  }
}
