import { RegistreringType, Servicegruppe, Formidlingsgruppe } from '../ducks/registreringstatus';
import { Data as RegStatusData } from '../ducks/registreringstatus';
import { JSONObject } from 'yet-another-fetch-mock/dist/types/types';
import moment from 'moment';

interface MaksDatoMomentType {
    maksDato: moment.Moment;
}

export default {
    underOppfolging: false,
    jobbetSeksAvTolvSisteManeder: false,
    maksDato: moment(new Date(), 'DD.MM.YYYY').add(13, 'week'),
    registreringType: RegistreringType.ORDINAER_REGISTRERING,
    servicegruppe: Servicegruppe.IVURD,
    formidlingsgruppe: Formidlingsgruppe.ARBS
} as RegStatusData&JSONObject&MaksDatoMomentType;
