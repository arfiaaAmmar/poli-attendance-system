import { Request, Response } from "express";
import { RegistrationFormModel } from "../model/models";
import { handleCatchError } from "../helpers/controller-helpers";
import {
  EmergencyContact,
  IRegisterForm,
  TenantInfo,
  UploadedFiles,
} from "shared-library/declarations/types";
import { FM } from "shared-library/declarations/constants";

export const postRegisterForm = async (req: Request, res: Response) => {
  try {
    const {
      tenantInfo,
      emergencyContact,
      roomNo,
      blockNo,
      resitNo,
      tenantAgreement,
      timestamp,
    } = req.body as IRegisterForm;
    const files: unknown = req.files;
    const uploadedFiles: UploadedFiles[] = Array.isArray(files)
      ? files : [files];
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
    const emergencyContactInput: EmergencyContact = {
      ...emergencyContact,
      address: { ...emergencyContact.address },
    };
    await RegistrationFormModel.create({
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

export const getRegisterForm = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const registrationForm = await RegistrationFormModel.findById(id);
    if (!registrationForm)
      return res.status(201).json({ message: FM.registerFormNotFound });
    return res.json(registrationForm);
  } catch (error) {
    handleCatchError(res, error);
  }
};

export const getAllRegisterForms = async (req: Request, res: Response) => {
  try {
    const registerForms = await RegistrationFormModel.find();
    const registerFormsWithDownloadUrls = registerForms.map((registerForm) => {
      const downloadUrl = `/uploads/${registerForm.paymentReceiptFileName}`;
      return { ...registerForm.toObject(), downloadUrl };
    });
    return res.json(registerFormsWithDownloadUrls);
  } catch (error) {
    handleCatchError(res, error);
  }
};

export const updateRegisterForm = async (req: Request, res: Response) => {
  const { id } = req.params;
  const input = req.body as IRegisterForm;
  try {
    const updatedRegistrationForm =
      await RegistrationFormModel.findByIdAndUpdate(id, input);
    if (!updatedRegistrationForm)
      return res.status(404).json({ message: FM.registerFormNotFound });
    res.status(200).json(updatedRegistrationForm);
  } catch (error) {
    handleCatchError(res, error);
  }
};

export const deleteRegisterForm = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const existingForm = await RegistrationFormModel.findById(id);
    if (!existingForm) {
      return res.status(404).json({ message: FM.registerFormNotFound });
    }
    await RegistrationFormModel.findByIdAndDelete(id);
    res.status(200).json({ message: FM.registerFormDeleted });
  } catch (error) {
    handleCatchError(res, error);
  }
};
