import * as moment from 'moment';
import { parse } from 'query-string';

const search = parse(window.location.search);
export const tisekunder = 10;
const femMinutter = 300;
const enTime = 3600;

const autexpirationMock = {
    remainingSeconds: 1121,
    expirationTime: moment(new Date(), '').add(search.visSesjonUtlopt ? femMinutter + tisekunder : enTime,  'seconds'),
};

export default autexpirationMock;