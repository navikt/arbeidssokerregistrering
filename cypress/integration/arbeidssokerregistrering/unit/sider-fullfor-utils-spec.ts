import { sisteStillingErSatt } from "../../../../src/sider/fullfor/fullfor-utils";
import { annenStilling, ingenYrkesbakgrunn, tomStilling } from "../../../../src/ducks/siste-stilling";
import { sisteStillingMock } from "../../../../src/mocks/siste-stilling-mock";


describe('Test fullfor-utils', () => {
    it('test sisteStillingErSatt', () => {
        expect(sisteStillingErSatt(tomStilling)).to.equal(false);
        expect(sisteStillingErSatt(undefined)).to.equal(false);
        expect(sisteStillingErSatt(annenStilling)).to.equal(true);
        expect(sisteStillingErSatt(ingenYrkesbakgrunn)).to.equal(true);
        expect(sisteStillingErSatt(sisteStillingMock)).to.equal(true);
    });
});