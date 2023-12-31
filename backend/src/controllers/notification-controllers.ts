import { NextFunction, Request, Response } from "express";
import { handleCatchError } from "../helpers/controller-helpers";
import { NotificationModel } from "../model/models";
import { FM, USER_TYPE } from "shared-library/src/declarations/constants";

export const postNotification = async (req: Request, res: Response) => {
  try {
    const input = req.body;
    await NotificationModel.create(input);
    res.status(201).json({ message: FM.notificationAdded });
  } catch (error) {
    handleCatchError(res, error);
  }
};

export const getAllNotifications = async (req: Request, res: Response) => {
  const { userType, userId } = req.params;

  try {
    let notifications;
    const { penyelia, pelajar } = USER_TYPE;
    const propToSeach =
      userType === penyelia
        ? { senderUserType: pelajar }
        : { receiverId: userId, senderUserType: penyelia };
    notifications = await NotificationModel.find(propToSeach);
    if (!notifications || notifications.length === 0) {
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
