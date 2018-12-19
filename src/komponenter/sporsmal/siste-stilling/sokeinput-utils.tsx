import { annenStilling } from '../../../ducks/siste-stilling';

export function hentStillingsAlternativer(typeaheadYrkeList: {}[], sokestreng: string) {
    const alternativer = typeaheadYrkeList
        .sort((a: { label: string }, b: { label: string }) => a.label.localeCompare(b.label))
        .map((stilling: { label: string, styrk08: string[], konseptId: number }, index: number) => {
            const styrk08 = stilling.styrk08.length > 0 ? stilling.styrk08[0] : '';
            return {
                id: index,
                labelKey: stilling.label,
                stilling: {
                    label: stilling.label,
                    styrk08: styrk08,
                    konseptId: stilling.konseptId,
                }
            };
        });

    const blankSokestreng = sokestreng.length === 0;
    const alternativerMedAnnenStilling = [
        ...alternativer,
        {
            id: alternativer.length,
            labelKey: 'Annen stilling',
            stilling: annenStilling,
        }
    ];

    return blankSokestreng ? [] : alternativerMedAnnenStilling;
}
