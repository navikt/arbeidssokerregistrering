import { SporsmalId } from '../../ducks/svar';

// TODO: Denne propsen brukes kun for å eksponere SporsmalId til skjema
// TODO: Dette kunne blitt løst på en bedre måte ved bruk av en config som inneholder alle spørsmålene
export interface SporsmalProps {
    sporsmalId: SporsmalId;
}