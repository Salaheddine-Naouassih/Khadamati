import { Request } from "express";
import { FileArray } from "express-fileupload";

export interface FilesRequest extends Request {
  file: FileArray;
}
