import * as moment from 'moment';
import { InjectedIntl } from 'react-intl';

interface Alternativer {
    fra?: Date;
    til?: Date;
}

// eslint-disable-next-line import/prefer-default-export
export function validerDatoField(input: Date, intl: InjectedIntl, alternativer: Alternativer) {
    const { fra, til } = alternativer;
    const inputDato = moment(input);

    const fraDato = moment(fra);
    const tilDato = moment(til);

    if (input && !erGyldigISODato(input)) {
        return intl.formatMessage({
            id: 'datepicker.feilmelding.ugyldig-dato',
        });
    } else if (
        fra &&
        til &&
        (inputDato.isAfter(tilDato, 'day') || fraDato.isAfter(inputDato, 'day'))
    ) {
        tilDato.add(1, 'day');
        fraDato.subtract(1, 'day');

        const msgValues = {
            fradato: toDatePrettyPrint(fraDato.date()),
            tildato: toDatePrettyPrint(tilDato.date()),
        };
        return intl.formatMessage(
            { id: 'datepicker.feilmelding.innenfor-periode' },
            (msgValues as {[key: string]: string})
        );
    }
    return undefined;
}

export const autobind = (ctx) => {
    Object.getOwnPropertyNames(ctx.constructor.prototype)
        .filter(prop => typeof ctx[prop] === 'function')
        .forEach(method => {
            // eslint-disable-next-line
            ctx[method] = ctx[method].bind(ctx);
        });
};

export const dateToISODate = dato => {
    const parsetDato = moment(dato);
    return dato && parsetDato.isValid() ? parsetDato.toISOString() : '';
};

export const erGyldigISODato = isoDato => {
    return !!(isoDato && moment(isoDato, moment.ISO_8601).isValid());
};

export const ISODateToDatePicker = dato => {
    const parsetDato = moment(dato);
    return dato && parsetDato.isValid() ? parsetDato.format('DD.MM.YYYY') : '';
};

export const datePickerToISODate = dato => {
    const parsetDato = moment(dato, 'DD.MM.YYYY', true);
    return parsetDato.isValid() ? parsetDato.toISOString() : '';
};

export const erGyldigFormattertDato = formattertDato => {
    return !!(
        formattertDato &&
        formattertDato.length === 10 &&
        moment(formattertDato, 'DD.MM.YYYY', true).isValid()
    );
};

export const toDatePrettyPrint = dato => {
    if (typeof dato === 'undefined' || dato === null) {
        return null;
    }

    const _dato = toDate(dato);

    const days =
        _dato.getDate() < 10 ? `0${_dato.getDate()}` : `${_dato.getDate()}`;
    const months =
        _dato.getMonth() + 1 < 10
            ? `0${_dato.getMonth() + 1}`
            : `${_dato.getMonth() + 1}`;
    const years = _dato.getFullYear();

    return `${days}.${months}.${years}`;
};

export const toDate = dato => {
    return erLocalDate(dato)
        ? new Date(dato.year, dato.monthValue - 1, dato.dayOfMonth)
        : new Date(dato);
};

const erLocalDate = dato => {
    return dato.year && dato.monthValue && dato.dayOfMonth;
};

export function isBeforeDate(dato?: Date) {
    return (value) => !!dato && moment(value).endOf('day').isSameOrBefore(dato);
}

export function isAfterDate(dato?: Date) {
    return (value) => !!dato && moment(value).startOf('day').isSameOrAfter(dato);
}

export function toDateOrUndefined(dato: Date) {
    return erGyldigISODato(dato) ? new Date(dato) : undefined;
}