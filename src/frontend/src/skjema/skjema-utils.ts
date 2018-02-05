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
    1: ['6'],
    2: ['1'],
    3: ['2'],
    4: ['2', '3'],
    5: ['1'],
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
