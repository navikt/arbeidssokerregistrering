/*tslint:disable*/
import { expect } from 'chai';
import {getAlleSporsmalSomIkkeSkalBesvares} from "./skjema-utils";
import { State as SvarState } from '../../ducks/svar';

describe('skjema-utils', () => {
    it('getAlleSporsmalSomIkkeSkalBesvares skal returnere riktig spørsmål', () => {
        const sporsmalIder = ['a', 'b', 'c'];
        const svar = {
            'a': 1,
            'b': 4,
            'c': 3,
            'd': 2,
        };
        const config = {
            a: {
                alternativId: 1,
                skip: ['e', 'f'],
            },
            b: {
                alternativId: 4,
                skip: ['g'],
            }
        };

        expect(getAlleSporsmalSomIkkeSkalBesvares(sporsmalIder, svar as SvarState, config)).to.deep.equal(['e','f','g']);
    });
});