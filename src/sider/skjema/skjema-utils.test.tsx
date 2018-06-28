/*tslint:disable*/
import { expect } from 'chai';
import { getAlleSporsmalSomIkkeSkalBesvares, getTekstIdForSvar } from "./skjema-utils";
import { State as SvarState } from '../../ducks/svar';
import {DinSituasjonSvar} from "../../ducks/svar-utils";

describe('skjema-utils', () => {
    it('getAlleSporsmalSomIkkeSkalBesvares skal returnere riktig spørsmål', () => {
        const sporsmalIder = ['a', 'b', 'c'];
        const svar = {
            'a': DinSituasjonSvar.ALDRI_HATT_JOBB,
            'b': DinSituasjonSvar.INGEN_SVAR,
            'c': 3,
            'd': 2,
        };
        const config = {
            a: {
                svar: DinSituasjonSvar.ALDRI_HATT_JOBB,
                skip: ['e', 'f'],
            },
            b: {
                svar: DinSituasjonSvar.INGEN_SVAR,
                skip: ['g'],
            }
        };

        expect(getAlleSporsmalSomIkkeSkalBesvares(sporsmalIder, svar as SvarState, config)).to.deep.equal(['e','f','g']);
    });

    it('test getTekstIdForSvar', () => {
        expect(getTekstIdForSvar('din-situasjon', DinSituasjonSvar.ALDRI_HATT_JOBB)).to.equal('din-situasjon-svar-aldri-hatt-jobb');
    });
});