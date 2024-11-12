import patientData from '../../data/patients';
import { Patient, SafePatient } from '../../types';

const getPatients = (): Patient[] => {
    return patientData;
};

const getSafePatients = (): SafePatient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => {
        return {
            id,
            name,
            dateOfBirth,
            gender,
            occupation
        };
    });
};

export default { getPatients, getSafePatients };
