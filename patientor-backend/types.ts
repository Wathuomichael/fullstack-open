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

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries?: Entry[]
}

export type newPatient = Omit<Patient, 'id'>;

export type SafePatient = Omit<Patient, 'ssn'>; 

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
