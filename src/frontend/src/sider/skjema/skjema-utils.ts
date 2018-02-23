/*
* Konfigurasjon
*
* Selvgående bruker
*
* key: spørsmål id
* value: [svar id] // liste med alternativ svar - gir utslag som selvgående bruker
*
* */
export const configIkkeSelvgaende = {
    1: ['1', '2'],
    2: ['2'],
    3: ['2', '3'],
    4: ['1'],
};

export const erIkkeSelvgaende = (avgittSvar: string, svarSomGirIkkeSelvgaende: string[]) => {
    return svarSomGirIkkeSelvgaende.includes(avgittSvar);
};

export const erSvarAlternativMerEnnTo = (spmId: string) => {
    let classname = '';
    if (spmId !== '1' && spmId !== '2') {
        classname = 'form-flex';
    }
    return classname;
};
