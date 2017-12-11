import * as React from 'react';
import IntlProvider from '../Intl-provider';
import * as renderer from 'react-test-renderer';
import Start from './start';
import { MatchProps } from '../skjema/skjema';
import { RouteComponentProps } from 'react-router';

test('Start komponent har riktig innhold og struktur', () => {
    const component = renderer.create(
        <IntlProvider><Start {...{} as RouteComponentProps<MatchProps>}  /></IntlProvider>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});