import * as moment from 'moment';

const autexpirationMock = {
    remainingSeconds: 1121,
    expirationTime: moment(new Date(), '').add(60,  'minutes'),
};

export default autexpirationMock;