import {
  AndreForholdSvar,
  DinSituasjonSvar,
  HelseHinderSvar,
  SisteStillingSvar,
  UtdanningBestattSvar,
  UtdanningGodkjentSvar,
  UtdanningSvar,
} from "../ducks/svar-utils";
import { SporsmalId } from "../ducks/svar";
import { State as SvarState } from "../ducks/svar";

const svarMock: SvarState = [
  { sporsmalId: SporsmalId.dinSituasjon, svar: DinSituasjonSvar.AKKURAT_FULLFORT_UTDANNING },
  { sporsmalId: SporsmalId.sisteStilling, svar: SisteStillingSvar.HAR_HATT_JOBB },
  { sporsmalId: SporsmalId.utdanning, svar: UtdanningSvar.HOYERE_UTDANNING_5_ELLER_MER },
  { sporsmalId: SporsmalId.utdanningGodkjent, svar: UtdanningGodkjentSvar.NEI },
  { sporsmalId: SporsmalId.utdanningBestatt, svar: UtdanningBestattSvar.JA },
  { sporsmalId: SporsmalId.helseHinder, svar: HelseHinderSvar.NEI },
  { sporsmalId: SporsmalId.andreForhold, svar: AndreForholdSvar.NEI },
];

export default svarMock;
