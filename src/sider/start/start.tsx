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
import Knappervertikalt from '../../komponenter/knapper/knapper-vertikalt';

const personSvg = require('./person-komprimert.svg');

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
                <div className="startside__banner">
                    <div className="limit">
                        <div className="startside__intro">
                            <p className="typo-undertittel">
                                <FormattedMessage id="overskrift-start-dialog" values={{fornavn: hentFornavn(name)}}/>
                            </p>
                            <p className="typo-normal">
                                <FormattedMessage id="beskrivelse-start-dialog"/>
                            </p>
                        </div>
                        <img
                            className="startside__intro__ikon"
                            src={personSvg}
                            alt="Person-ikon"
                        />
                    </div>
                </div>
                <div className="innhold-container">
                    <div className="innhold">
                        <Innholdstittel className="tittel">
                            <FormattedMessage id="overskrift-start"/>
                        </Innholdstittel>
                        <Normaltekst className="beskrivelse"><FormattedMessage id="beskrivelse-start"/></Normaltekst>
                        <Knappervertikalt>
                            <KnappBase
                                type="hoved"
                                onClick={() => history.push(`${SKJEMA_PATH}/0`)}
                            >
                                <FormattedMessage id="knapp-start"/>
                            </KnappBase>
                            <LenkeAvbryt tekstId="avbryt-lenke"/>
                        </Knappervertikalt>
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
