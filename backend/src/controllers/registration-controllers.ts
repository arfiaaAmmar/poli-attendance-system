import { NextFunction, Request, Response } from "express";
import { CheckInFormModel, CheckOutFormModel } from "../model/models";
import { handleCatchError } from "../helpers/controller-helpers";
import {
  CheckoutForm,
  Contact,
  ICheckInForm,
  TenantInfo,
  UploadedFiles,
} from "shared-library/src/declarations/types";
import { FM } from "shared-library/src/declarations/constants";

export const postCheckInForm = async (req: Request, res: Response) => {
  try {
    const {
      tenantInfo,
      emergencyContact,
      roomNo,
      blockNo,
      resitNo,
      tenantAgreement,
      timestamp,
    } = req.body as ICheckInForm;
    const files: unknown = req.files;
    const uploadedFiles: UploadedFiles[] = Array.isArray(files)
      ? files
      : [files];
    const offerLetterFileNames: string[] = [];
    const paymentReceiptFileNames: string[] = [];
    uploadedFiles.forEach((file) => {
      if (Array.isArray(file)) {
        if (file[0].fieldname === "offerLetterFile") {
          offerLetterFileNames.push(...file.map((f) => f.filename));
        } else if (file[0].fieldname === "paymentReceiptFile") {
          paymentReceiptFileNames.push(...file.map((f) => f.filename));
        }
      }
    });

    const tenantInfoInput: TenantInfo = {
      ...tenantInfo,
      address: { ...tenantInfo.address },
    };
    const emergencyContactInput: Contact = {
      ...emergencyContact,
      address: { ...emergencyContact.address },
    };
    await CheckInFormModel.create({
      tenantInfo: tenantInfoInput,
      roomNo,
      blockNo,
      resitNo,
      offerLetterFileName: offerLetterFileNames[0],
      paymentReceiptFileName: paymentReceiptFileNames[0],
      emergencyContact: emergencyContactInput,
      tenantAgreement,
      createdOn: timestamp,
    });
    res.status(201).json({
      message: FM.registerFormAdded,
    });
  } catch (error) {
    handleCatchError(res, error);
  }
};

export const postCheckOutForm = async (
  req: Request,
  res: Response,
) => {
  try {
    const input: CheckoutForm = req.body;

    await CheckOutFormModel.create({
      ...input,
      checkoutEvidenceFileName: req.file?.filename,
    });
    res.status(201).json({
      message: FM.registerFormAdded,
    });
  } catch (error) {
    handleCatchError(res, error);
  }
};

export const getCheckInForm = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const registrationForm = await CheckInFormModel.findById(id);
    if (!registrationForm)
      return res.status(201).json({ message: FM.registerFormNotFound });
    return res.json(registrationForm);
  } catch (error) {
    handleCatchError(res, error);
  }
};

export const getCheckOutForm = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const registrationForm = await CheckOutFormModel.findById(id);
    if (!registrationForm)
      return res.status(201).json({ message: FM.registerFormNotFound });
    return res.json(registrationForm);
  } catch (error) {
    handleCatchError(res, error);
  }
};

export const getAllCheckInForms = async (req: Request, res: Response) => {
  try {
    const registerForms = await CheckInFormModel.find();
    const registerFormsWithDownloadUrls = registerForms.map((registerForm) => {
      const downloadUrl = `/uploads/${registerForm.paymentReceiptFileName}`;
      return { ...registerForm.toObject(), downloadUrl };
    });
    return res.json(registerFormsWithDownloadUrls);
  } catch (error) {
    handleCatchError(res, error);
  }
};

export const getAllCheckOutForms = async (req: Request, res: Response) => {
  try {
    const registerForms = await CheckOutFormModel.find();
    const registerFormsWithDownloadUrls = registerForms.map((registerForm) => {
      const downloadUrl = `/uploads/${registerForm}`;
      return { ...registerForm.toObject(), downloadUrl };
    });
    return res.json(registerFormsWithDownloadUrls);
  } catch (error) {
    handleCatchError(res, error);
  }
};

export const updateCheckInForm = async (req: Request, res: Response) => {
  const { id } = req.params;
  const input = req.body as ICheckInForm;
  try {
    const updatedRegistrationForm = await CheckInFormModel.findByIdAndUpdate(
      id,
      input
    );
    if (!updatedRegistrationForm)
      return res.status(404).json({ message: FM.registerFormNotFound });
    res.status(200).json(updatedRegistrationForm);
  } catch (error) {
    handleCatchError(res, error);
  }
};

export const updateCheckOutForm = async (req: Request, res: Response) => {
  const { id } = req.params;
  const input = req.body as ICheckInForm;
  try {
    const updatedRegistrationForm = await CheckOutFormModel.findByIdAndUpdate(
      id,
      input
    );
    if (!updatedRegistrationForm)
      return res.status(404).json({ message: FM.registerFormNotFound });
    res.status(200).json(updatedRegistrationForm);
  } catch (error) {
    handleCatchError(res, error);
  }
};

export const deleteCheckInForm = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const existingForm = await CheckInFormModel.findById(id);
    if (!existingForm) {
      return res.status(404).json({ message: FM.registerFormNotFound });
    }
    await CheckInFormModel.findByIdAndDelete(id);
    res.status(200).json({ message: FM.registerFormDeleted });
  } catch (error) {
    handleCatchError(res, error);
  }
};

export const deleteCheckOutForm = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const existingForm = await CheckOutFormModel.findById(id);
    if (!existingForm) {
      return res.status(404).json({ message: FM.registerFormNotFound });
    }
    await CheckInFormModel.findByIdAndDelete(id);
    res.status(200).json({ message: FM.registerFormDeleted });
  } catch (error) {
    handleCatchError(res, error);
  }
};


