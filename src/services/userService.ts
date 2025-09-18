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

  static async createUser(userObj: {
    name: string;
    email: string;
    password: string;
  }) {
    const existingUser = await User.findOne({
      where: { email: userObj.email },
    });

    console.log("service userObj:");

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

  static async updateUser(
    id: number,
    userObj: { name?: string; email?: string; password?: string }
  ) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    let passwordHash;

    if (userObj.password) {
      passwordHash = await bcrypt.hash(userObj.password, 10);
    }

    await User.update(
      {
        ...(userObj.name !== undefined && { name: userObj.name }),
        ...(userObj.email !== undefined && { email: userObj.email }),
        passwordHash: passwordHash || user.passwordHash,
      },
      { where: { id } }
    );

    return user;
  }

  static async deleteUser(id: number) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    await user.destroy();
  }
}
