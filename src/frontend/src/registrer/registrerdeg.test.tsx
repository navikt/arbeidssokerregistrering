import * as React from 'react';
import IntlProvider from '../Intl-provider';
import * as renderer from 'react-test-renderer';
import Registrerdeg from './registrerdeg';
import { MatchProps } from '../skjema/skjema';
import { RouteComponentProps } from 'react-router';

test('Registrerdeg komponent har riktig innhold og struktur', () => {
    const component = renderer.create(
        <IntlProvider><Registrerdeg {...{} as RouteComponentProps<MatchProps>}  /></IntlProvider>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});