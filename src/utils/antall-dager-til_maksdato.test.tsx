import * as React from 'react';
import { expect } from 'chai';
import { antallDagerTilMaksdato } from './antall-dager-til-maksdato';

describe('Info for ikke-arbeidssøker uten oppfølging', () => {
    describe('antallDagerTilMaksdato', () => {
        it('Skal ha 349 dager igjen', () => {
            const maksdato = new Date('2021-02-18 01:00:00 GMT+0100');
            const idag = new Date('2020-03-05 15:43:28 GMT+0100');
            expect(antallDagerTilMaksdato(idag, maksdato)).to.equal(349);
        });
        it('Skal ha 227 dager igjen', () => {
            const maksdato = new Date('2020-10-19 02:00:00 GMT+0200');
            const idag = new Date('2020-03-05 15:41:31 GMT+0100');
            expect(antallDagerTilMaksdato(idag, maksdato)).to.equal(227);
        });
    });
});
