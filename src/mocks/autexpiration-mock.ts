import * as moment from 'moment';
export const tisekunder = 10;
const femMinutter = 300;
const enTime = 3600;

const autexpirationMock = {
    remainingSeconds: 1121,
    expirationTime:
        moment(new Date(), '').add(enTime + femMinutter + tisekunder,  'seconds'),
};

export default autexpirationMock;