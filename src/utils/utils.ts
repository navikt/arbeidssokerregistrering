import moment from 'moment';
import tekster from '../tekster'

export function hentFornavn(name: string | undefined) {
    return name ? storForbokstavOgEtterBindestrek(name.split(' ')[0]) : '';
}

function storForbokstavOgEtterBindestrek(name: string) {
    return name.split('-')
        .map(str => forsteTegnStorBokstav(str))
        .join('-');
}

function forsteTegnStorBokstav(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

export function getIntlMessage(messages: { [id: string]: string }, id: string): string {
    return messages[id] || id;
}

export function getTekst(tekstId: string, language: string) {
    const tekst = Object.keys(tekster).includes(language) ? tekster[language][tekstId] : false
    return tekst ? tekst : ''
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString().substring(1);
}

export function guid() {
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

export interface MatchProps {
    id: string;
}

/*
* Regn ut alder basert på fnr som kommer fra `veilarboppfolging/api/me`
* Senere kan koden under bli erstattes med at backend regner ut alder istenfor
* */

function erDNummer (personId: string) {
    const forsteSiffer = Number(personId.substring(0, 1));
    return forsteSiffer > 3 && forsteSiffer < 8;
}

function parseDNummer (personId: string) {
    return !erDNummer(personId) ? personId : personId.substring(1);
}

function toSifferFodselsAar (personId: string) {
    return personId.substring(4, 6);
}

function hentAarhundre (personId: string) {
    let result;
    const individNummer = Number(personId.substring(6, 9));
    const fodselsAar = Number(personId.substring(4, 6));

    if (individNummer <= 499) {
        result = '19';
    } else if (individNummer >= 500 && fodselsAar < 40) {
        result = '20';
    } else if (individNummer >= 500 && individNummer <= 749 && fodselsAar >= 54) {
        result = '18';
    } else if (individNummer >= 900 && fodselsAar > 39) {
        result = '19';
    }

    return result;
}

export function formaterDato(dato: string | undefined) {

    if (!dato) {
        return '';
    }

    return moment(dato, 'YYYY-MM-DD').format('DD. MMMM YYYY');
}

export function hentAlder(personId: string) {

    const fnr = parseDNummer(personId);

    const aarhundre = hentAarhundre(fnr);
    const fnrForsteFireSiffer = fnr.substring(0, 4);
    const toSifferFAar = toSifferFodselsAar(fnr);

    const fodselsdato = moment(`${fnrForsteFireSiffer}${aarhundre}${toSifferFAar}`, 'DDMMYYYY');

    return moment().diff(fodselsdato, 'years');
}

export function scrollToBanner() {
    let scrollHeight = 0;
    const header = document.querySelector('.siteheader');
    if (header) {
        scrollHeight = header.getBoundingClientRect().height;
    }
    setTimeout(() => window.scrollTo(0, scrollHeight), 0);
}

export function disableVerikalScrollingVedAnimasjon() {
    document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
    setTimeout(() => {
        document.getElementsByTagName('body')[0].style.overflowY = 'auto';
    },         600);
}
