import { hentStillingsAlternativer } from "../../../../../src/sider/skjema-registrering/sporsmal/sporsmal-siste-stilling/sokeinput-utils";
import pamJanzzData from "../../../../../src/mocks/typeahead-mock";
import { Stilling } from "../../../../../src/ducks/siste-stilling";

describe('utils test', () => {
    it('test hentStillingsAlternativer', () => {
        const { typeaheadYrkeList } = pamJanzzData;

        const stillingsAlternativer = hentStillingsAlternativer(typeaheadYrkeList, 'sokestreng');
        const annenStilling: Stilling = {
            label: 'Annen stilling',
            styrk08: '-1',
            konseptId: -1
        };
        const annenStillingOption = {
            id: 14,
            labelKey: annenStilling.label,
            stilling: annenStilling
        };
        expect(stillingsAlternativer.length).to.equal(15);
        expect(stillingsAlternativer[14]).to.deep.equal(annenStillingOption)
    });

    it('hvis hentStillingsAlternativer er tom skal man returnere en tom liste', () => {
        const typeaheadYrkeList = [];

        const stillingsAlternativer = hentStillingsAlternativer(typeaheadYrkeList, 'sokestreng');
        const annenStilling: Stilling = {
            label: 'Annen stilling',
            styrk08: '-1',
            konseptId: -1
        };
        const annenStillingOption = {
            id: 0,
            labelKey: annenStilling.label,
            stilling: annenStilling
        };
        expect(stillingsAlternativer.length).to.equal(1);
        expect(stillingsAlternativer[0]).to.deep.equal(annenStillingOption)
    });

});