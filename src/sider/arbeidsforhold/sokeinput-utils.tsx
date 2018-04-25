export function hentStillingsAlternativer(typeaheadYrkeList: {}[], sokestreng: string) {
    const alternativer = typeaheadYrkeList
        .sort((a: { label: string }, b: { label: string }) => a.label.localeCompare(b.label))
        .map((stilling: { label: string, styrk08NavListe: string[] }, index: number) => {
            const styrk08 = stilling.styrk08NavListe.length > 0 ? stilling.styrk08NavListe[0] : '';
            return {
                id: index,
                labelKey: stilling.label,
                stilling: {
                    label: stilling.label,
                    styrk08,
                    konseptId: -1
                }
            };
        });

    const blankSokestreng = sokestreng.length === 0;
    const alternativerMedAnnenStilling = [
        ...alternativer,
        {
            id: alternativer.length,
            labelKey: 'Annen stilling',
            stilling: {
                tittel: 'Annen stilling',
                styrk08: '-1',
                stilling: -1
            }
        }
    ];

    return blankSokestreng ? [] : alternativerMedAnnenStilling;
}
