export type Svar = UtdanningSvar
    | UtdanningBestattSvar
    | UtdanningGodkjentSvar
    | HelseHinderSvar
    | AndreForholdSvar
    | SisteStillingSvar
    | DinSituasjonSvar;

export enum DinSituasjonSvar {
    MISTET_JOBBEN = 'MISTET_JOBBEN',
    ALDRI_HATT_JOBB = 'ALDRI_HATT_JOBB',
    HAR_SAGT_OPP = 'HAR_SAGT_OPP',
    VIL_BYTTE_JOBB = 'VIL_BYTTE_JOBB',
    ER_PERMITTERT = 'ER_PERMITTERT',
    USIKKER_JOBBSITUASJON = 'USIKKER_JOBBSITUASJON',
    JOBB_OVER_2_AAR = 'JOBB_OVER_2_AAR',
    VIL_FORTSETTE_I_JOBB = 'VIL_FORTSETTE_I_JOBB',
}

export enum SisteStillingSvar {
    HAR_HATT_JOBB = 'HAR_HATT_JOBB',
    HAR_IKKE_HATT_JOBB = 'HAR_IKKE_HATT_JOBB',
    INGEN_SVAR = 'INGEN_SVAR',
}

export enum UtdanningSvar {
    INGEN_UTDANNING = 'INGEN_UTDANNING',
    GRUNNSKOLE = 'GRUNNSKOLE',
    VIDEREGAENDE_GRUNNUTDANNING = 'VIDEREGAENDE_GRUNNUTDANNING',
    VIDEREGAENDE_FAGBREV_SVENNEBREV = 'VIDEREGAENDE_FAGBREV_SVENNEBREV',
    HOYERE_UTDANNING_1_TIL_4 = 'HOYERE_UTDANNING_1_TIL_4',
    HOYERE_UTDANNING_5_ELLER_MER = 'HOYERE_UTDANNING_5_ELLER_MER',
}

export enum UtdanningGodkjentSvar {
    JA = 'JA',
    NEI = 'NEI',
    VET_IKKE = 'VET_IKKE',
    INGEN_SVAR = 'INGEN_SVAR',
}

export enum UtdanningBestattSvar {
    JA = 'JA',
    NEI = 'NEI',
    INGEN_SVAR = 'INGEN_SVAR',
}

export enum HelseHinderSvar {
    JA = 'JA',
    NEI = 'NEI',
}

export enum AndreForholdSvar {
    JA = 'JA',
    NEI = 'NEI',
}