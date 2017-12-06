
export interface SvarState {
    svarListe: [Svar]
}

interface Svar {
    sporsmalId: string,
    alternativId: string
}

export default function(state: SvarState, action: string): SvarState {
    return state;
}