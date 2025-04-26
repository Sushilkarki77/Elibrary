import { Router } from "express";
import { createSubject, getAllSubjects, getSubject, deleteSubject } from "../controllers/subject.controllers";
import { validateRequest } from "../middlewares/requestValidator.middleware";
import { subjectSchema } from "../middlewares/schemas";

const router = Router();

router.post("/",validateRequest(subjectSchema), createSubject);
router.get("/", getAllSubjects);
router.get("/:subjectId", getSubject);
router.delete("/:subjectId", deleteSubject);

export default router;
