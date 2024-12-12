import express from 'express';
import patientService from '../services/patient';
import { Entry, EntryWithoutId, newPatient, Patient } from '../../types';
import { toNewPatient } from '../utils/patient';
import { parseEntry } from '../utils/entry';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getSafePatients());
});

router.get('/:id', (req, res) => {
    const id = req.params.id;    
    const patients = patientService.getPatients();
    const patient = patients.find(p => p.id === id);
    res.send(patient);
});

router.post('/', (req, res) => {
    const newEntry: newPatient = toNewPatient(req.body);
    const newPatient: Patient = patientService.addPatient(newEntry);
    res.status(201).json(newPatient);
});

router.post('/:id/entries', (req, res) => {
    const id = req.params.id;
    const newEntry: EntryWithoutId = parseEntry(req.body);
    const addedEntry: Entry = patientService.addEntry(newEntry, id);
    res.status(201).json(addedEntry);
});

export default router;
