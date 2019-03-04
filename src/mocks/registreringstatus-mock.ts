import { RegistreringType } from '../ducks/registreringstatus';
import * as moment from 'moment';

export default {
    underOppfolging: true,
    jobbetSeksAvTolvSisteManeder: false,
    maksDato: moment(new Date(), 'DD.MM.YYYY').add(13, 'week'),
    registreringType: RegistreringType.ORDINAER_REGISTRERING,
    hostname: 'adeo.no',
};
