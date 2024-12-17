import { HealthCheckEntry } from "../../types";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
  entry: HealthCheckEntry
}

const HealthCheckEntryDetails = ({ entry }: Props) => {
  return (
    <div className="entry">
      <p>{entry.date} <MedicalInformationIcon /></p>
      <p>{entry.description}</p>
      <p>{<FavoriteIcon sx={entry.type === 'HealthCheck' ? 
                            entry.healthCheckRating === 3 ? { color: 'red' } : 
                            entry.healthCheckRating === 2 ? { color: 'coral' } : 
                            entry.healthCheckRating === 1 ? { color: 'greenyellow' } : 
                            { color: 'green'} : { display: 'none' }} />}</p>
      <p>diagnosed by {entry.specialist}</p>
    </div>
  );
};

export default HealthCheckEntryDetails;
