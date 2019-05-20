import * as moment from 'moment';
export const tisekunder = 10;
const femMinutter = 300;

const autexpirationMock = {
    remainingSeconds: 1121,
    expirationTime:
        moment(new Date(), '').add(femMinutter + tisekunder,  'seconds'),
};

export default autexpirationMock;