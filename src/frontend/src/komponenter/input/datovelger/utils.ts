import * as moment from 'moment';

const localDateFormat = /\d{4}-\d\d-\d\d/;

export const autobind = (ctx) => {
    Object.getOwnPropertyNames(ctx.constructor.prototype)
        .filter(prop => typeof ctx[prop] === 'function')
        .forEach(method => {
            // eslint-disable-next-line
            ctx[method] = ctx[method].bind(ctx);
        });
};

function pad(value: string) {
    if (value.length > 1) {
        return value;
    }
    return '0' + value;
}

export function erGyldigIsoDato(isoDato?: string) {
    return !!(isoDato && moment(isoDato, moment.ISO_8601, true).isValid());
}

export function isoDateToDatePicker(dato?: string) {
    const parsetDato = moment(dato);
    return dato && parsetDato.isValid() ? parsetDato.format('DD.MM.YYYY') : '';
}

export function datePickerToISODate(dato: string) {
    const parsetDato = moment(dato, 'DD.MM.YYYY', true);
    return parsetDato.isValid() ? parsetDato.toISOString() : '';
}

export function erGyldigFormattertDato(formattertDato?: string) {
    return !!(
        formattertDato &&
        formattertDato.length === 10 &&
        moment(formattertDato, 'DD.MM.YYYY', true).isValid()
    );
}

export const toDatePrettyPrint = dato => {
    if (typeof dato === 'undefined' || dato === null) {
        return null;
    }

    const year = `${dato.getFullYear()}`;
    const month = `${dato.getMonth() + 1}`;
    const day = `${dato.getDay()}`;

    return `${pad(day)}.${pad(month)}.${year}`;
};

export function isBeforeDate(dato?: Date) {
    return (value) => !!dato && moment(value).endOf('day').isBefore(dato);
}

export function isAfterDate(dato?: Date) {
    return (value) => !!dato && moment(value).startOf('day').isAfter(dato);
}

export function localDateStringToDate(localDate?: string) {
    if (!localDate) {
        return undefined;
    }

    if (!localDate.match(localDateFormat)) {
        throw new Error(`Date should be on format YYYY-MM-DD, but was ${localDate}`);
    }

    return new Date(Date.parse(localDate));
}

export function isoDateStringToDate(date?: string) {
    if (!date || !erGyldigIsoDato(date)) {
        return undefined;
    }
    return new Date(date);
}

export function dateToLocalDateString(date?: Date) {
    if (!date) {
        return undefined;
    }

    const year = `${date.getFullYear()}`;
    const month = `${date.getMonth() + 1}`;
    const day = `${date.getDate()}`;

    return `${year}-${pad(month)}-${pad(day)}`;
}

export function isoDateToLocalDateString(isoDateString: string) {
    const date = new Date(isoDateString);

    return dateToLocalDateString(date);
}