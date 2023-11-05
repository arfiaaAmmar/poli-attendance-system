import { Request, Response } from "express";
import { ComplaintModel } from "../model/models";
import { handleCatchError } from "../helpers/controller-helpers";
import { FM } from "../../../shared-library/declarations/constants";

export const getComplaint = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const complaint = await ComplaintModel.findById(id);

    if (!complaint)
      return res.status(400).json({ message: FM.complaintNotFound });

    return res.json(complaint);
  } catch (error) {
    handleCatchError(res, error);
  }
};

export const getAllComplaints = async (req: Request, res: Response) => {
  try {
    const complaints = await ComplaintModel.find();

    const complainstWithDownloadUrls = complaints.map((complaint) => {
      const downloadUrl = `/uploads/${complaint.evidenceFileName}`;
      return { ...complaint.toObject(), downloadUrl };
    });
    return res.json(complainstWithDownloadUrls);
  } catch (error) {
    handleCatchError(res, error);
  }
};

export const postComplaint = async (req: Request, res: Response) => {
  try {
    const input = req.body;
    const evidenceFile = req.file;
    if (!evidenceFile)
      return res.status(400).json({ message: FM.noFileUploaded });
    await ComplaintModel.create({
      ...input,
      evidenceFileName: evidenceFile.filename,
    });

    res.status(201).json({ message: FM.complaintAdded });
  } catch (error) {
    handleCatchError(res, error);
  }
};

export const updateComplaint = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateInput = req.body;
  try {
    const updatedComplaint = await ComplaintModel.findByIdAndUpdate(
      id,
      updateInput,
      { new: true }
    );

    if (!updatedComplaint)
      return res.status(404).json({ message: FM.complaintNotFound });

    res.status(200).json(updatedComplaint);
  } catch (error) {
    handleCatchError(res, error);
  }
};


export const deleteComplaint = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const existingComplaint = await ComplaintModel.findById(id);
    if (!existingComplaint)
      return res.status(404).json({ message: FM.complaintNotFound });

    await ComplaintModel.findByIdAndDelete(id);

    res.status(200).json({ message: FM.complaintDeleted });
  } catch (error) {
    handleCatchError(res, error);
  }
};
