import { useMatch } from "react-router-dom";
import { Diagnosis, Entry, EntryWithoutId, HealthCheckRating, Patient } from "../types";
import EntryDetails from "./EntryDetails";
import React, { useState } from "react";
import { Button } from "@mui/material";
import patientService from '../services/patients';

interface Props {
  patients: Patient[],
  diagnoses: Diagnosis[],
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
}

const PatientInfo = ({ patients, diagnoses, setPatients }: Props) => {
  const [entryFormDisplay, setEntryFormDisplay] = useState(false);
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [rating, setRating] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const match = useMatch('/:id');
  const patient = patients.find(p => p.id === match?.params.id);

  const handleRating = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if(typeof event.target.value == 'string') {
      const value = event.target.value;
      setRating(value);
      const healthCheckNumber = Object.values(HealthCheckRating).find(r => r.toString() === value);

      if(healthCheckNumber) {
        setHealthCheckRating(Number(healthCheckNumber));
      }
    }
  };
  
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if(patient) {
      const object: EntryWithoutId = {
        description: desc,
        date,
        specialist,
        diagnosisCodes,
        type: 'HealthCheck',
        healthCheckRating
      };

      const newEntry = await patientService.createEntry(object, patient.id);
      if(patient.entries) {
        patient.entries.push(newEntry);
      } else {
        patient.entries = [newEntry];
      }

      setPatients((prevPatients: Patient[]) => {
        return prevPatients.map(p => p.id === patient.id ? patient : p);
      });

      setDesc('');
      setDate('');
      setSpecialist('');
      setDiagnosisCodes([]);
      setRating('');
    } else {
      throw new Error('Missing fields');
    }

  };

  return (
    <div>
      <h2>{patient?.name}</h2>
      <p>ssn: {patient?.ssn}</p>
      <p>Occupation: {patient?.occupation}</p>
      <Button variant="contained" onClick={() => setEntryFormDisplay(!entryFormDisplay)}>Add new Entry</Button>
      {entryFormDisplay ? 
      <form onSubmit={handleSubmit} className="patient-info">
        <h3>New HealthCheck Entry</h3>
        Description: <input name="desc" value={desc} onChange={(event) => setDesc(event.target.value)}></input>
        Date: <input name="date" value={date} onChange={(event) => setDate(event.target.value)}></input>
        Specialist: <input name="specialist" value={specialist} onChange={(event) => setSpecialist(event.target.value)}></input>
        Diagnosis Codes: <input name="diagnosisCodes" value={diagnosisCodes} onChange={(event) => setDiagnosisCodes((event.target.value).split(','))}></input>
        Healthcheckrating: <input name="healthCheckRating" value={rating} onChange={handleRating}></input>
        <Button variant="outlined" color="error" onClick={() => setEntryFormDisplay(!entryFormDisplay)}>Cancel</Button>
        <Button type="submit" variant="contained" className="addEntry">Add</Button>
      </form>
      : null}
      <h3>Entries</h3>
      <div>{patient?.entries?.map(entry => {
        return (
          <div key={entry.id}>
            <EntryDetails entry={entry} />
            <ul>{entry.diagnosisCodes?.map(code => {
              const diagnosis = diagnoses.find(d => d.code == code);
              return <li key={code}>{code} {diagnosis?.name}</li>;
            })}</ul>
          </div>
        );
      })}</div>
    </div>
  );
};

export default PatientInfo;
