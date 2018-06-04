import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import KnappBase from 'nav-frontend-knapper';
import { MatchProps } from '../../utils/utils';
import { selectInnloggingsinfo, State as InnloggingsInfoState } from '../../ducks/innloggingsinfo';
import { AppState } from '../../reducer';
import { hentFornavn } from '../../utils/utils';
import { SKJEMA_PATH } from '../../utils/konstanter';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';
const veilederSvg = require('../../ikoner/illustrasjon-start.svg');

interface StateProps {
    innloggingsInfo: InnloggingsInfoState;
}

type StartProps = StateProps & null;

export class Start extends React.Component<RouteComponentProps<MatchProps> & StartProps> {
    render() {
        const {innloggingsInfo, history} = this.props;
        const {name} = innloggingsInfo.data;
        return (
            <section className="startside">
                <div className="figur__wrapper">
                    <img src={veilederSvg} className="figur"/>
                </div>
                <div className="innhold-container">
                    <div className="innhold">
                        <Innholdstittel className="tittel">
                            <FormattedMessage id="overskrift-start" values={{fornavn: hentFornavn(name)}}/>
                        </Innholdstittel>
                        <Normaltekst className="beskrivelse"><FormattedMessage id="beskrivelse-start"/></Normaltekst>
                        <KnappBase
                            type="hoved"
                            className="knapp-start"
                            onClick={() => history.push(`${SKJEMA_PATH}/0`)}
                        >
                            <FormattedMessage id="knapp-start"/>
                        </KnappBase>
                        <LenkeAvbryt />
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    innloggingsInfo: selectInnloggingsinfo(state)
});

export default connect(mapStateToProps, null)(Start);
