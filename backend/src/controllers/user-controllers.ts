import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { ObjectId } from "mongodb";
import { JWT_SECRET } from "../config/config";
import { handleCatchError } from "../helpers/controller-helpers";
import { UserModel } from "../model/models";
import { User } from "shared-library/src/declarations/types";
import { FM } from "shared-library/src/declarations/constants";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const userData: User = req.body;
    const { email } = userData;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: FM.userAlreadyExist });
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    await UserModel.create({ ...userData, password: hashedPassword });

    res.status(201).json({ message: FM.userRegistered });
  } catch (error) {
    handleCatchError(res, error);
  }
};


export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as Pick<User, "email" | "password">;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: FM.userNotFound });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: FM.invalidEmailOrPassword });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET!);

    return res.json({ message: FM.loggedInSuccessfully, token });
  } catch (error) {
    handleCatchError(res, error);
  }
};


export const authoriseUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: FM.authorizationTokenNotProvided });
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET!);
    const userId: ObjectId = new ObjectId(decoded.userId);
    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).json({ message: FM.userNotFound });
    } else {
      return res.json({
        _id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        userType: user.userType,
      });
    }
  } catch (error) {
    handleCatchError(res, error);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({}, { password: 0 }).exec();
    if (users.length === 0) {
      return res.status(404).json({ message: FM.userNotFound });
    }

    return res.json(users);
  } catch (error) {
    handleCatchError(res, error);
  }
};


export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const existingUser = await UserModel.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: FM.userNotFound });
    }

    await UserModel.findByIdAndDelete(id);
    res.status(200).json({ message: FM.userDeleted });
  } catch (error) {
    handleCatchError(res, error);
  }
};

