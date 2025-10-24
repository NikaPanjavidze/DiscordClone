import { ZodError, ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

const validateResource =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      if (e instanceof ZodError) {
        return res
          .status(400)
          .json({ errors: e.issues.map((issue) => issue.message) });
      }
      next(e);
    }
  };

export default validateResource;
