import { RegistreringType } from '../ducks/registreringstatus';
import * as moment from 'moment';

export default {
    underOppfolging: false,
    jobbetSeksAvTolvSisteManeder: false,
    maksDato: moment(new Date(), 'DD.MM.YYYY').add(13, 'week'),
    registreringType: RegistreringType.SYKMELDT_REGISTRERING
};
