import { Data as BrukersNavnData } from '../ducks/brukers-navn';
import { JSONObject } from 'yet-another-fetch-mock/dist/types/types';

export default {
    fornavn: 'Test',
    mellomnavn: null,
    etternavn: 'Testesen',
    sammensattNavn: 'Test Testesen'
} as BrukersNavnData&JSONObject;
