import patientData from '../../data/patients';
import { newPatient, Patient, SafePatient } from '../../types';
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

export default { getPatients, getSafePatients, addPatient };
