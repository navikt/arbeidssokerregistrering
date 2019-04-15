import { RegistreringType } from '../ducks/registreringstatus';
import moment from 'moment';

export default {
    underOppfolging: false,
    jobbetSeksAvTolvSisteManeder: false,
    maksDato: moment(new Date(), 'DD.MM.YYYY').add(13, 'week'),
    registreringType: RegistreringType.ORDINAER_REGISTRERING
};
