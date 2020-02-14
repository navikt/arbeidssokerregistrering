import * as React from 'react';
import { expect } from 'chai';
import { antallUkerSykmeldt } from './antall-uker-sykmeldt';

describe('Info for ikke-arbeidssøker uten oppfølging', () => {
    describe('antallUkerSykmeldt', () => {
        it('Skal være sykmeldt i 51 uker', () => {
            const maksdato = new Date('2020-02-20');
            const idag = new Date('2020-02-13');
            expect(antallUkerSykmeldt(idag, maksdato)).to.equal(51);
        });
        it('Skal være sykmeldt i 50 uker', () => {
            const maksdato = new Date('2020-02-20');
            const idag = new Date('2020-02-12');
            expect(antallUkerSykmeldt(idag, maksdato)).to.equal(50);
        });
    });
});
