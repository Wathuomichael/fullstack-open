import { Entry, Gender, newPatient } from "../../types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(gender);
}; 

const isEntry = (entry: unknown): entry is Entry => {
    const validTypes = ["Hospital", "HealthCheck", "OccupationalHealthcare"];
    if (
        typeof entry === "object" &&
            entry !== null &&
            "type" in entry &&
            typeof entry.type === 'string' &&
            validTypes.includes(entry.type)
    ) {
        return true;
    }
    return false;
};
const parseName = (name: unknown): string => {
    if(!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }

    return name;
};

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date ' + date);
    }

    return date;
};

const parseSsn = (ssn: unknown): string => {
    if(!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }

    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if(!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }

    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if(!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }

    return occupation;
};

const parseEntries = (entries: unknown): Entry[] => {
    if (!Array.isArray(entries)) {
        throw new Error("Incorrect or missing entries");
    }
    if (!entries.every(isEntry)) {
        throw new Error("Invalid entries");
    }

    return entries;
};

export const toNewPatient = (object: unknown): newPatient => {
    if(!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
        return {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            entries: parseEntries(object.entries),
            occupation: parseOccupation(object.occupation)
        };
    }

    throw new Error('Incorrect data: Missing fields');
};
