import { HospitalEntry } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface Props {
  entry: HospitalEntry
}
const HospitalEntryDetails = ({ entry }: Props) => {
  return (
    <div className="entry">
      <p>{entry.date} <LocalHospitalIcon /></p>
      <p>{entry.description}</p>
      <p>diagnosed by {entry.specialist}</p>
    </div>
  );
};

export default HospitalEntryDetails;
