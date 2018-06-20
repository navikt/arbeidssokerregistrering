import { State as SvarState } from '../../ducks/svar';

export function getTekstIdForAlternativ(sporsmalId: string, alternativId: number) {
    return `${sporsmalId}-alternativ-${alternativId}`;
}

function getSporsmalSomIkkeSkalBesvares(sporsmalId: string, alternativId: number): string[] {
    switch (sporsmalId) {
        case 'din-situasjon': {
            // Brukere som svarer "har ikke hatt jobb" i din-situasjon skal ikke få spørsmål om siste stilling.
            return (alternativId === 2) ? ['siste-stilling'] : [];
        }
        default: {
            return [];
        }
    }
}

export function getAlleSporsmalSomIkkeSkalBesvares(sporsmalIder: string[], svar: SvarState): string[] {
    let sporsmal: string[] = [];
    sporsmalIder.forEach(sporsmalId =>
        sporsmal = [...sporsmal, ...getSporsmalSomIkkeSkalBesvares(sporsmalId, svar[sporsmalId])]);
    return sporsmal;
}