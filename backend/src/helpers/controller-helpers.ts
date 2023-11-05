import { Response } from "express";
import { FM } from "shared-library/declarations/constants";


export const handleCatchError = (res: Response, error: any) => {
    console.error(error);
    return res.sendStatus(500).json({ message: FM.internalServerError });
};
