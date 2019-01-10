import { RegistreringType } from '../ducks/registreringstatus';
import * as moment from 'moment';

export default {
    underOppfolging: false,
    jobbetSeksAvTolvSisteManeder: false,
    maksDato: moment(new Date(), 'DD.MM.YYYY').add(1, 'week'),
    registreringType: RegistreringType.ORDINAER_REGISTRERING
};
