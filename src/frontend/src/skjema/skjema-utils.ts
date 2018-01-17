import { SvarState } from '../ducks/svar';

export function hentValgteAlternativ() {
    return Array.from(document.getElementsByName(`alternativ`) as NodeListOf<HTMLInputElement>)
        .reduce((acc, curr, i) => curr.checked ? (i + 1).toString() : acc, '-1');
}

export function uncheckRadioButtons() {
    Array.from(document.getElementsByName(`alternativ`) as NodeListOf<HTMLInputElement>)
        .forEach(input => input.checked = false);
}

/*
* ConfigSpmPrSide
* key = sideurl
* value = sporsmål id
* */
export const configSpmPrSide = {
    1: ['1'],
    2: ['2'],
    3: ['3'],
    4: ['4'],
    5: ['5']
};

/*
* Konfigurasjon
*
* Selvgående bruker
*
* key: spørsmål id
* value: [svar id] // liste med alternativ svar - gir utslag som selvgående bruker
*
* */
export const configSelvgaende = {
    1: ['1', '2', '3', '4', '5'],
    2: ['2', '3'],
    3: ['1'],
    4: ['1'],
    5: ['2'],
};

export const erSelvgaende = (svar: SvarState) => {
    let resultat = true;
    Object.keys(svar).map((key) => {
        const res = configSelvgaende[key].filter((configSvar: string) => configSvar === svar[key]);
        if (res.length === 0) { resultat = false; }
    });

    return resultat;
};

export const erSvarAlternativMerEnnTo = (spmId: string) => {
    let classname = '';
    if (spmId !== '1' && spmId !== '2') {
        classname = 'form-flex';
    }
    return classname;
};

export const visRiktigCssMarginBottom = (spmListePaSiden: string[], spmId: string) => {
    let blokkCssMarginBottom = 'blokk-s';

    if (spmListePaSiden.length === parseInt(spmId , 10) - 1 || spmListePaSiden.length === 1) {
        blokkCssMarginBottom = 'blokk-l';
    }
    return blokkCssMarginBottom;
};
