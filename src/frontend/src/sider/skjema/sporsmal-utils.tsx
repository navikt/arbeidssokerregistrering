export function getTekstIdForAlternativ(sporsmalId: string, alternativId: number) {
    return `${sporsmalId}-alternativ-${alternativId}`;
}

export function erSelvgaende(sporsmalId: string, alternativId: number): boolean {
    switch (sporsmalId) {
        case 'helse':
            return alternativId === 1;
        case 'utdanning':
            return [2, 3, 4, 5, 6].includes(alternativId);
        default:
            return false;
    }
}