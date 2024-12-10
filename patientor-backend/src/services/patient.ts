import patientData from '../../data/patients';
import { Entry, EntryWithoutId, newPatient, Patient, SafePatient } from '../../types';
import { v1 as uuid } from 'uuid';
const getPatients = (): Patient[] => {
    return patientData;
};

const getSafePatients = (): SafePatient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => {
        return {
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
            entries
        };
    });
};

const addPatient = (object: newPatient): Patient => {
    const id = uuid();    
    const finalNewPatient: Patient = {
        id,
        ...object
    };

    patientData.push(finalNewPatient);
    return finalNewPatient;
};

const addEntry = (object: EntryWithoutId, patientId: string): Entry => {
    const id = uuid();
    const newEntry = {
        id,
        ...object
    };

    const patient = patientData.find(p => p.id === patientId);
    const index = patient ? patientData.indexOf(patient): null;
    patient?.entries?.push(newEntry);
    
    if(!index || !patient) {
        throw new Error('Patient not found');
    }
    patientData[index]= patient;
    
    return newEntry;
};

export default { getPatients, getSafePatients, addPatient, addEntry };
