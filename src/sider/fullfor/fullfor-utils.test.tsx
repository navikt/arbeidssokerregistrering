/*tslint:disable*/
import {expect} from 'chai';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {sisteStillingErSatt} from "./fullfor-utils";
import {annenStilling, ingenYrkesbakgrunn, tomStilling} from "../../ducks/siste-stilling";
import {sisteStillingMock} from "../../mocks/siste-stilling-mock";

enzyme.configure({adapter: new Adapter()});
afterEach(() => {
    if (fetch.restore) {
        fetch.restore()
    }
});

describe('Test fullfor-utils', () => {
    it('test sisteStillingErSatt', () => {
        expect(sisteStillingErSatt(tomStilling)).to.equal(false);
        expect(sisteStillingErSatt(undefined)).to.equal(false);
        expect(sisteStillingErSatt(annenStilling)).to.equal(true);
        expect(sisteStillingErSatt(ingenYrkesbakgrunn)).to.equal(true);
        expect(sisteStillingErSatt(sisteStillingMock)).to.equal(true);
    });

});