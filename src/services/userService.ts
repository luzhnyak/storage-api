import bcrypt from "bcrypt";
import { HttpError } from "../helpers";
import User from "../models/User";

export class UserService {
  static async getAllUsers() {
    const users = await User.findAll({
      attributes: { exclude: ["passwordHash", "createdAt", "updatedAt"] },
    });

    return users;
  }

  static async getUserById(id: number) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    return user;
  }

  static async getUserByEmail(email: string) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    return user;
  }

  static async addUser(userObj: {
    name: string;
    email: string;
    password: string;
  }) {
    const existingUser = await User.findOne({
      where: { email: userObj.email },
    });

    if (existingUser) {
      throw new HttpError(409, "User already exists");
    }

    const passwordHash = await bcrypt.hash(userObj.password, 10);

    const newUser = await User.create({
      ...userObj,
      passwordHash,
    });

    return newUser;
  }
}
