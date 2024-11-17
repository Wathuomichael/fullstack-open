import express from 'express';
import patientService from '../services/patient';
import { newPatient, Patient } from '../../types';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getSafePatients());
});

router.post('/', (req, res) => {
    const newEntry: newPatient = toNewPatient(req.body);
    const newPatient: Patient = patientService.addPatient(newEntry);
    res.status(201).json(newPatient);
});

export default router;
