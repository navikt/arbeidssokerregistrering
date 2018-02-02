import { expect } from 'chai';
import {
    erGyldigFormattertDato, erGyldigIsoDato, isAfterDate, isBeforeDate, isoDateToLocalDateString, localDateStringToDate,
    toDatePrettyPrint, validerPeriode
} from './utils';

describe('Datovelger utils', () => {
    it('localDateStringToDate skal konvertere localDate korrekt', () => {
        const date = localDateStringToDate('2018-01-01');
        expect(date.getFullYear()).to.equal(2018);
        expect(date.getMonth()).to.equal(0);
        expect(date.getDay()).to.equal(1);
        expect(localDateStringToDate(null)).to.equal(undefined);
    });

    it('localDateStringToDate skal kaste feil dersom dato er på feil format', () => {
        expect(() => localDateStringToDate('01.01.2018')).to.throw();
    });
    it('isoDateToLocalDateString skal konvertere Date til YYYY-MM-DD', () => {
        expect(isoDateToLocalDateString('2018-01-01T12:00:00Z')).to.equal('2018-01-01');
        expect(isoDateToLocalDateString('2018-02-01T12:00:00Z')).to.equal('2018-02-01');
        expect(isoDateToLocalDateString('2018-02-10T12:00:00Z')).to.equal('2018-02-10');
    });
    it('toDatePrettyPrint skal konvertere Date til DD.MM.YYYY', () => {
        const date = new Date('2018-01-01T12:00:00Z');
        expect(toDatePrettyPrint(date)).to.equal('01.01.2018');
    });
    it('isBeforeDate skal validere korrekt', () => {
        const before = new Date('2018-01-01T12:00:00Z');
        const after = new Date('2018-01-01T13:00:00Z');

        expect(isBeforeDate(after)(before)).to.equal(false);
        expect(isBeforeDate(new Date('2018-01-02T13:00:00Z'))(new Date('2018-01-01T13:00:00Z'))).to.equal(true);
    });
    it('isAfterDate skal validere korrekt', () => {
        const before = new Date('2018-01-01T12:00:00Z');
        const after = new Date('2018-01-01T13:00:00Z');

        expect(isAfterDate(before)(after)).to.equal(false);
        expect(isAfterDate(new Date('2018-01-01T13:00:00Z'))(new Date('2018-01-02T13:00:00Z'))).to.equal(true);
    });
    it('erGyldigFormattertDato skalvalidere korrekt', () => {
        expect(erGyldigFormattertDato('01.01.2017')).to.equal(true);
        expect(erGyldigFormattertDato(undefined)).to.equal(false);
        expect(erGyldigFormattertDato(null)).to.equal(false);
        expect(erGyldigFormattertDato(null)).to.equal(false);
        expect(erGyldigFormattertDato('1.1.2017')).to.equal(false);
        expect(erGyldigFormattertDato('2017.01.01')).to.equal(false);
    });
    it('erGyldigIsoDato skal validere korrekt', () => {
        expect(erGyldigIsoDato('2018-01-01T12:00:00Z')).to.equal(true);
        expect(erGyldigIsoDato('2018-01-01T12:00:00+02:00')).to.equal(true);
        expect(erGyldigIsoDato('2018-01-01')).to.equal(true);
        expect(erGyldigIsoDato('01-01-2018')).to.equal(false);
        expect(erGyldigIsoDato(undefined)).to.equal(false);
        expect(erGyldigIsoDato(null)).to.equal(false);
    });
    it('validerPeriode skal validere om periode er gyldig', () => {
        expect(validerPeriode(new Date('2018-02-01T12:00:00Z'), new Date('2018-02-02T12:00:00Z'))).to.equal(true);
        expect(validerPeriode(new Date('2018-02-01T12:00:00Z'), new Date('2018-02-02T08:00:00Z'))).to.equal(true);
        expect(validerPeriode(new Date('2018-02-01T01:00:00+02:00'), new Date('2018-01-31T23:00:00Z'))).to.equal(true);
        expect(validerPeriode(undefined, new Date('2018-01-31T23:00:00+02:00'))).to.equal(true);
        expect(validerPeriode(undefined, undefined)).to.equal(true);
        expect(validerPeriode(new Date('2018-01-31T23:00:00+02:00'), undefined)).to.equal(true);
        expect(validerPeriode(undefined, new Date('2018-01-31T23:00:00+02:00'))).to.equal(true);

        expect(validerPeriode(new Date('2018-02-01T12:00:00Z'), new Date('2018-01-31T12:00:00Z'))).to.equal(false);
    });
});