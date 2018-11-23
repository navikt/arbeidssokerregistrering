import { SporsmalId, State } from './svar';

export type Svar = UtdanningSvar
    | UtdanningBestattSvar
    | UtdanningGodkjentSvar
    | HelseHinderSvar
    | AndreForholdSvar
    | SisteStillingSvar
    | DinSituasjonSvar
    | IngenSvar
    | FremtidigSituasjonSvar
    | HvorLangTidSvar
    | TilbakeIArbeidSvar;

export enum IngenSvar {
    INGEN_SVAR = 'INGEN_SVAR',
}

export enum DinSituasjonSvar {
    MISTET_JOBBEN = 'MISTET_JOBBEN',
    ALDRI_HATT_JOBB = 'ALDRI_HATT_JOBB',
    HAR_SAGT_OPP = 'HAR_SAGT_OPP',
    VIL_BYTTE_JOBB = 'VIL_BYTTE_JOBB',
    ER_PERMITTERT = 'ER_PERMITTERT',
    USIKKER_JOBBSITUASJON = 'USIKKER_JOBBSITUASJON',
    JOBB_OVER_2_AAR = 'JOBB_OVER_2_AAR',
    VIL_FORTSETTE_I_JOBB = 'VIL_FORTSETTE_I_JOBB',
    AKKURAT_FULLFORT_UTDANNING = 'AKKURAT_FULLFORT_UTDANNING',
    DELTIDSJOBB_VIL_MER = 'DELTIDSJOBB_VIL_MER',
    INGEN_SVAR = 'INGEN_SVAR',
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
    INGEN_SVAR = 'INGEN_SVAR',
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
    INGEN_SVAR = 'INGEN_SVAR',
}

export enum AndreForholdSvar {
    JA = 'JA',
    NEI = 'NEI',
    INGEN_SVAR = 'INGEN_SVAR',
}

export enum FremtidigSituasjonSvar {
    SAMME_ARBEIDSGIVER = 'SAMME_ARBEIDSGIVER',
    SAMME_ARBEIDSGIVER_NY_STILLING = 'SAMME_ARBEIDSGIVER_NY_STILLING',
    USIKKER = 'USIKKER',
    NY_ARBEIDSGIVER = 'NY_ARBEIDSGIVER',
    INGEN_PASSER = 'INGEN_PASSER',
    INGEN_SVAR = 'INGEN_SVAR',
}

export enum HvorLangTidSvar {
    KORT_SIKT = 'KORT_SIKT',
    LANG_SIKT = 'LANG_SIKT',
    INGEN_SVAR = 'INGEN_SVAR',
}

export enum TilbakeIArbeidSvar {
   JA_FULL_STILLING = 'JA_FULL_STILLING',
   JA_REDUSERT_STILLING = 'JA_REDUSERT_STILLING',
   NEI = 'NEI',
   USIKKER = 'USIKKER'
}

export const hentSvar = (svarState: State, sporsmalId: SporsmalId): Svar | undefined => {
    const sporsmalsindeks = svarState.findIndex(data => data.sporsmalId === sporsmalId);
    return (sporsmalsindeks >= 0) ? svarState[sporsmalsindeks].svar : undefined;
};

export const erSporsmalBesvarte = (svarState: State, sporsmalIder: SporsmalId[]): boolean => {
    for (let i = 0; i < sporsmalIder.length; i++) {
        if (hentSvar(svarState, sporsmalIder[i]) === undefined) {
            return false;
        }
    }
    return true;
};
