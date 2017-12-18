import { fetchToJson } from './utils';
const VEILARBOPPFOLGING_URL = '/veilarboppfolgingproxy/api/startRegistreringStatus';

export function hentRegistreringStatus(fnr: string) {
    const url = `${VEILARBOPPFOLGING_URL}/${fnr}`;
    return fetchToJson(url);
}