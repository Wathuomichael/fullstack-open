import { useMatch } from "react-router-dom";
import { Patient } from "../types";

interface Props {
  patients: Patient[]
}

const PatientInfo = ({ patients }: Props) => {
  const match = useMatch('/:id');
  const patient = patients.find(p => p.id === match?.params.id);

  return (
    <div>
      <h2>{patient?.name}</h2>
      <p>ssn: {patient?.ssn}</p>
      <p>Occupation: {patient?.occupation}</p>
      <h3>Entries</h3>
      <div>{patient?.entries?.map(entry => {
        return (
          <div key={entry.id}>
            <p>{entry.date} {entry.description}</p>
            <ul>{entry.diagnosisCodes?.map(code => <li key={code}>{code}</li>)}</ul>
          </div>
        );
      })}</div>
    </div>
  );
};

export default PatientInfo;
