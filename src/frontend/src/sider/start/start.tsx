import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { MatchProps } from '../../utils/utils';
import { selectInnloggingsinfo, State as InnloggingsInfoState } from '../../ducks/innloggingsinfo';
import { AppState } from '../../reducer';
import { hentFornavn } from '../../utils/utils';
import { DINSITUASJON_PATH } from '../../utils/konstanter';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';

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
                <figure className="figur"/>
                <div className="innhold-container">
                    <div className="innhold">
                        <Innholdstittel className="tittel">
                            <FormattedMessage id="overskrift-start" values={{fornavn: hentFornavn(name)}}/>
                        </Innholdstittel>
                        <Normaltekst className="beskrivelse"><FormattedMessage id="beskrivelse-start"/></Normaltekst>
                        <Knapp type="hoved" className="knapp-start" onClick={() => history.push(DINSITUASJON_PATH)}>
                            <FormattedMessage id="knapp-start"/>
                        </Knapp>
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
