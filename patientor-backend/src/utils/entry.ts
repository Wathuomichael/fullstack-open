import { BaseEntryWithoutId, Diagnosis, EntryWithoutId, HealthCheckEntry, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry } from "../../types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
    return typeof number === 'number' || number instanceof Number;
};

const isRating = (rating: number): rating is HealthCheckRating => {
    return Object.values(HealthCheckRating).map(r => Number(r)).includes(rating);
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date ' + date);
    }

    return date;
};

const parseDescription = (description: unknown): string => {
    if(!description || !isString(description)) {
        throw new Error('Missing or incorrect description');
    }

    return description;
};

const parseSpecialist = (specialist: unknown): string => {
    if(!specialist || !isString(specialist)) {
        throw new Error('Missing or incorrect specialist');
    }

    return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        return [] as Array<Diagnosis['code']>;
    }

    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    if(!rating || !isNumber(rating) || !isRating(rating)) {
        throw new Error('Incorrect or missing rating');
    }

    return rating;
};

const parseEmployerName = (employerName: unknown): string => {
    if(!employerName || !isString(employerName)) {
        throw new Error('Incorrect or missing Employer name');
    }

    return employerName;
};

const parseSickLeave = (sickLeave: unknown): OccupationalHealthcareEntry['sickLeave'] => {
    if(!sickLeave || typeof sickLeave !== 'object') {
        throw new Error('Incorrect or missing sick leave');
    }
    if(!('startDate' in sickLeave) || !isString(sickLeave.startDate) || !isDate(sickLeave.startDate)) {
        throw new Error('Incorrect or missing sick leave start date');
    }

    if(!('endDate' in sickLeave) || !isString(sickLeave.endDate) || !isDate(sickLeave.endDate)) {
        throw new Error('Incorrect or missing sick leave end date');
    }
    const { startDate, endDate } = sickLeave;

    return { startDate, endDate };
};

const parseDischarge = (discharge: unknown): HospitalEntry['discharge'] => {
    if(!discharge || typeof discharge !== 'object') {
        throw new Error('Incorrect or missing discharge');
    }
    if(!('date' in discharge) || !isString(discharge.date) || !isDate(discharge.date)) {
        throw new Error('Incorrect or missing discharge date');
    }

    if(!('criteria' in discharge) || !isString(discharge.criteria)) {
        throw new Error('Incorrect or missing discharge criteria');
    }

    const { date, criteria } = discharge;

    return { date, criteria };
};

const parseBaseEntry = (object: unknown): BaseEntryWithoutId => {
    if(!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if('description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object) {
        return {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
        };
    }

    throw new Error('Invalid base entry');
};

const parseHealthCheckEntry = (object: unknown): Omit<HealthCheckEntry, 'id'> => {
    const baseEntry = parseBaseEntry(object);

    if(!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if('type' in object && object.type === 'HealthCheck' && 'healthCheckRating' in object) {
        return {
            ...baseEntry,
            type: 'HealthCheck',
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
        };
    }

    throw new Error('Incorrect Healthcheck entry');
};

const parseHospitalEntry = (object: unknown): Omit<HospitalEntry, 'id'> => {
    const baseEntry = parseBaseEntry(object);

    if(!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if('type' in object && object.type === 'Hospital' && 'discharge' in object) {
        return {
            ...baseEntry,
            type: 'Hospital',
            discharge: parseDischarge(object.discharge)
        };
    }

    throw new Error('Incorrect Hospital Entry');
};

const parseOccupationalHealthcareEntry = (object: unknown): Omit<OccupationalHealthcareEntry, 'id'> => {
    const baseEntry = parseBaseEntry(object);

    if(!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if('type' in object && object.type === 'OccupationalHealthcare' && 'employerName' in object && 'sickLeave' in object) {
        return {
            ...baseEntry,
            type: 'OccupationalHealthcare',
            employerName: parseEmployerName(object.employerName),
            sickLeave: parseSickLeave(object.sickLeave)
        };
    }

    throw new Error('Incorrect occupationalhealthcare entry');
};

export const parseEntry = (object: unknown): EntryWithoutId => {
    if(!object || typeof object !== 'object' || !('type' in object)) {
        throw new Error('Incorrect or missing data');
    }
    switch (object.type) {
        case 'HealthCheck':
            return parseHealthCheckEntry(object);
        case 'OccupationalHealthcare':
            return parseOccupationalHealthcareEntry(object);
        case 'Hospital':
            return parseHospitalEntry(object);
        default:
            throw new Error('Invalid entry type');
    }
};

/* export const toNewEntry = (object: unknown): EntryWithoutId => {
    if(!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if('description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object) {
        const baseEntry = {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
        };

        if('type' in object) {
            if(object.type === 'HealthCheck' && 'healthCheckRating' in object) {
                return {
                    ...baseEntry,
                    type: 'HealthCheck',
                    healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
                };
            } else if(object.type === 'Hospital' && 'discharge' in object) {
                return {
                    ...baseEntry,
                    type: 'Hospital',
                    discharge: parseDischarge(object.discharge)
                };
            } else if(object.type === 'OccupationalHealthcare' && 'employerName' in object && 'sickLeave' in object) {
                return {
                    ...baseEntry,
                    type: 'OccupationalHealthcare',
                    employerName: parseEmployerName(object.employerName),
                    sickLeave: parseSickLeave(object.sickLeave)
                };
            }

            throw new Error('Incorrect or missing entry type');
        }
    }

    throw new Error('Incorrect or missing fields');
};

*/
