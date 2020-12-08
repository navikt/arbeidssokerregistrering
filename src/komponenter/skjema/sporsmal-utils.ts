import { Svar } from "../../ducks/svar-utils";
import { SporsmalId } from "../../ducks/svar";
import { RegistreringType } from "../../ducks/registreringstatus";

export interface SporsmalProps {
  sporsmalId: SporsmalId;
  endreSvar: (sporsmalId: SporsmalId, svar: Svar) => void;
  hentAvgittSvar: (sporsmalId: SporsmalId) => Svar | undefined;
  registeringType: RegistreringType;
}
