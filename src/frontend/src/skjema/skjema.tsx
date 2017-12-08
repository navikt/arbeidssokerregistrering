import * as React from 'react';
import {connect, Dispatch} from 'react-redux';
import {Radio} from 'nav-frontend-skjema';
import {InjectedIntlProps, injectIntl} from 'react-intl';
import antallSporsmal from '../sporsmal/alle-sporsmal';
import {Undertittel} from 'nav-frontend-typografi';
import {Panel} from 'nav-frontend-paneler';
import {Knapp} from 'nav-frontend-knapper';
import { endreSvarAction } from '../ducks/svar';
import { AppState } from '../reducer';

interface SkjemaProps {
    id: string;
}

interface AlternativProps {
    tekstId: string;
}

interface DispatchProps {
    endreSvar: (sporsmalId: string, alternativId: string) => void;
}

function Skjema({id, intl}: SkjemaProps & InjectedIntlProps & DispatchProps) {
    const antallAlternativer = antallSporsmal[parseInt(id) - 1];
    const tittelId = `sporsmal-${id}-tittel`;
    return <div>
        <Undertittel className="blokk-xxs">{intl.messages[tittelId]}</Undertittel>
        <Panel>
            <form>
                {Array.from(Array(antallAlternativer).keys())
                    .map(i => i + 1)
                    .map((key) => <Alternativ key={key} tekstId={`sporsmal-${id}-alternativ-${key}`} intl={intl}/>)}
            </form>
        </Panel>
        <Knapp type="hoved" onClick={(() => console.log('neste'))}>Neste</Knapp>
    </div>;
}

function Alternativ({tekstId, intl}: AlternativProps & InjectedIntlProps) {
    const tekst = intl.messages[tekstId];

    return <Radio onClick={onClick} className="blokk-xs" name={'alternativ'} label={tekst} value={tekst}/>;
}

function onClick(event: React.MouseEvent<HTMLInputElement>) {
    return console.log('event', event);
}

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    endreSvar: (sporsmalId, alternativId) => dispatch(endreSvarAction(sporsmalId, alternativId)),
});

export default connect(null, mapDispatchToProps)
    (injectIntl(Skjema)
);