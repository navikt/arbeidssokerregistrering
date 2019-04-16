/*tslint:disable*/
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
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
        expect(sisteStillingErSatt(tomStilling)).toEqual(false);
        expect(sisteStillingErSatt(undefined)).toEqual(false);
        expect(sisteStillingErSatt(annenStilling)).toEqual(true);
        expect(sisteStillingErSatt(ingenYrkesbakgrunn)).toEqual(true);
        expect(sisteStillingErSatt(sisteStillingMock)).toEqual(true);
    });

});