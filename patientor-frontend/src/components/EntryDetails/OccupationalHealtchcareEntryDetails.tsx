import { OccupationalHealthcareEntry } from "../../types";
import WorkIcon from '@mui/icons-material/Work';

interface Props {
  entry: OccupationalHealthcareEntry
}

const OccupationalHealthcareEntryDetails = ({ entry }: Props) => {
  return (
    <div className="entry">
      <p>{entry.date} <WorkIcon /> {entry.employerName}</p>
      <p>{entry.description}</p>
      <p>diagnosed by {entry.specialist}</p>
    </div>
  );
};

export default OccupationalHealthcareEntryDetails;
