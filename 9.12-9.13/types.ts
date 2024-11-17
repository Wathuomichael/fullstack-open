export enum Gender {
    male = 'male',
    female = 'female',
    other = 'other'
}

export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string
}

export type newPatient = Omit<Patient, 'id'>;

export type SafePatient = Omit<Patient, 'ssn'>; 
