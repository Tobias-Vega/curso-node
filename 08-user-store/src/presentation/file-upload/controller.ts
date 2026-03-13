import { Request, Response } from "express";
import { CustomError } from "../../domain";


export class FileUploadController {

  private handleError(error: unknown, res: Response) {

    if (error instanceof CustomError) {
      return res.status(error.statusCode).json(error.message);
    }

  }

  uploadFile = async (req: Request, res: Response) => {

    res.json('uploadFile');

  }

  uploadMultipleFiles = async (req: Request, res: Response) => {

    res.json('uploadMultipleFiles');

  }

}