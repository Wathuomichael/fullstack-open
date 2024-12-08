import { Entry } from "../types";
import HealthCheckEntryDetails from "./EntryDetails/HealthCheckEntryDetails";
import HospitalEntryDetails from "./EntryDetails/HospitalEntryDetails";
import OccupationalHealthcareEntryDetails from "./EntryDetails/OccupationalHealtchcareEntryDetails";

interface Props {
  entry: Entry
}

const EntryDetails = ({ entry }: Props) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckEntryDetails  entry={entry}/>;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case 'Hospital':
      return <HospitalEntryDetails entry={entry} />;
    default:
      break;
  }

};

export default EntryDetails;
