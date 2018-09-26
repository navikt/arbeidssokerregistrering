/*tslint:disable*/
import * as React from 'react';
import { expect } from 'chai';
import { State as SvarState } from '../../ducks/svar';
import { Data as RegStatus } from '../../ducks/registreringstatus';
import { DinSituasjonSvar } from '../../ducks/svar-utils';
import { getTekstIdForArbeidSisteManeder } from './oppsummering-utils';

describe('oppsummering-utils', () => {
    it('Hvis bruker og AAReg er enige om at bruker har vært i jobb, så skal getTekstIdForArbeidSisteManeder returnere tom string', () => {
        const svarState: SvarState = {dinSituasjon: DinSituasjonSvar.VIL_FORTSETTE_I_JOBB};
        const regStatus: RegStatus = {jobbetSeksAvTolvSisteManeder: true};
        expect(getTekstIdForArbeidSisteManeder(svarState, regStatus)).to.be.equal('');
    });

    it('Hvis bruker og AAReg er enige om at bruker IKKE har vært i jobb, så skal getTekstIdForArbeidSisteManeder returnere tom string', () => {
        const svarState: SvarState = {dinSituasjon: DinSituasjonSvar.ALDRI_HATT_JOBB};
        const regStatus: RegStatus = {jobbetSeksAvTolvSisteManeder: false};
        expect(getTekstIdForArbeidSisteManeder(svarState, regStatus)).to.be.equal('');
    });

    it('Hvis bruker svarer at den har vært i jobb og AAReg uenig, skal getTekstIdForArbeidSisteManeder returnere riktig tekst', () => {
        const svarState: SvarState = {dinSituasjon: DinSituasjonSvar.VIL_FORTSETTE_I_JOBB};
        const regStatus: RegStatus = {jobbetSeksAvTolvSisteManeder: false};
        expect(getTekstIdForArbeidSisteManeder(svarState, regStatus)).to.be.equal('oppsummering-arbeidserfaring-2');
    });

    it('Hvis bruker svarer at den IKKE har vært i jobb og AAReg uenig, skal getTekstIdForArbeidSisteManeder returnere riktig tekst', () => {
        const svarState: SvarState = {dinSituasjon: DinSituasjonSvar.ALDRI_HATT_JOBB};
        const regStatus: RegStatus = {jobbetSeksAvTolvSisteManeder: true};
        expect(getTekstIdForArbeidSisteManeder(svarState, regStatus)).to.be.equal('oppsummering-arbeidserfaring-1');
    });
});