import express, { NextFunction, Request, Response } from 'express';
import patientService from '../services/patient';
import { newPatient, Patient } from '../../types';
import { newPatientSchema } from '../utils';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getSafePatients());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        newPatientSchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if(error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    } else {
        next(error);
    }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, newPatient>, res: Response<Patient>) => {
    const newPatient: Patient = patientService.addPatient(req.body);
    res.status(201).json(newPatient);
});

router.use(errorMiddleware);

export default router;
