export function getTekstIdForAlternativ(sporsmalId: string, alternativId: number) {
    return `${sporsmalId}-alternativ-${alternativId}`;
}

export function erSelvgaende(sporsmalId: string, alternativId: number | undefined): boolean {
    if (alternativId === undefined) {
        return false;
    }
    switch (sporsmalId) {
        case 'helse':
            return [2].includes(alternativId);
        case 'utdanning':
            return [3, 4, 5, 6].includes(alternativId);
        default:
            return false;
    }
}