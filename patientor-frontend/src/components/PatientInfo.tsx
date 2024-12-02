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
    </div>
  );
};

export default PatientInfo;
