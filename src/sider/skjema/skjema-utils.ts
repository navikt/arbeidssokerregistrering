export function getTekstIdForAlternativ(sporsmalId: string, alternativId: number) {
    return `${sporsmalId}-alternativ-${alternativId}`;
}

export const alternativIderSomGirSelvgaendeConfig = {
    helse: [2],
    utdanning: [2, 3, 4, 5, 6],
    helseandreforhold: [1, 2],
    helsehinder: [1, 2],
    utdanningbestatt: [1, 2],
    utdanninggodkjent: [1, 2, 3]
};

export function erSelvgaende(
    sporsmalId: string,
    alternativId: number | undefined,
    config: Object = alternativIderSomGirSelvgaendeConfig
): boolean {
    if ((alternativId === undefined) || (config[sporsmalId] === undefined)) {
        return false;
    } else {
        return config[sporsmalId].includes(alternativId);
    }
}