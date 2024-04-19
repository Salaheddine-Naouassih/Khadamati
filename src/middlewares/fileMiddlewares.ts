import { Request, Response, NextFunction } from "express";

export function fileMiddleware(req: Request, res: Response) {
  if (
    !req.files ||
    Object.keys(req.files).length === 0 ||
    !("video" in req.files)
  ) {
    res.status(400).send("No video file uploaded");
    return;
  }
  console.log("Nice called");
}
