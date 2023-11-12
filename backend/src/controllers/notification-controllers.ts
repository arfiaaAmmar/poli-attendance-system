import { NextFunction, Request, Response } from "express";
import { handleCatchError } from "../helpers/controller-helpers";
import { NotificationModel } from "../model/models";
import { INotification } from "shared-library/src/declarations/types";
import { FM } from "shared-library/src/declarations/constants";

export const postNotification = async (req: Request, res: Response) => {
  const input: INotification = req.body;
  try {
    await NotificationModel.create({ ...input });
    res.status(201).json({ message: FM.notificationAdded });
  } catch (error) {
    handleCatchError(res, error);
  }
};

export const getAllNotifications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;

  try {
    const notifications = await NotificationModel.find({ author: userId })
      .populate("author", "name")
      .exec();
    if (!notifications) {
      return res.status(400).json({ message: FM.notificationNotFound });
    }

    return res.json(notifications);
  } catch (error) {
    handleCatchError(res, error);
  }
};

export const getNotification = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const notification = await NotificationModel.findById(id)
      .populate("author", "name")
      .exec();
    if (!notification) {
      return res.status(400).json({ message: FM.notificationNotFound });
    }

    return res.json(notification);
  } catch (error) {
    handleCatchError(res, error);
  }
};

export const updateNotification = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isRead } = req.body;

  try {
    const updatedNotification = await NotificationModel.updateOne(
      { _id: id },
      { $set: { isRead: isRead } }
    );

    if (!updatedNotification) {
      return res.status(404).json({ message: FM.notificationNotFound });
    }

    res.status(200).json(updatedNotification);
  } catch (error) {
    handleCatchError(res, error);
  }
};

export const deleteNotification = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const existingNotification = await NotificationModel.findById(id);
    if (!existingNotification) {
      return res.status(404).json({ message: FM.notificationNotFound });
    }
    await NotificationModel.findByIdAndDelete(id);
    res.status(200).json({ message: FM.notificationDeleted });
  } catch (error) {
    handleCatchError(res, error);
  }
};
