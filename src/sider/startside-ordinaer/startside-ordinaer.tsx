import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Innholdstittel, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import KnappBase from 'nav-frontend-knapper';
import { hentFornavn, MatchProps } from '../../utils/utils';
import { selectBrukersNavn, State as BrukersNavnState } from '../../ducks/brukers-navn';
import { AppState } from '../../reducer';
import { SKJEMA_PATH } from '../../utils/konstanter';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';
import { Data as RegistreringstatusData, selectRegistreringstatus } from '../../ducks/registreringstatus';

import personSvg from './person-komprimert.svg';
import './startside-ordinaer.less';

interface StateProps {
    registreringstatusData: RegistreringstatusData;
    brukersNavn: BrukersNavnState;
}

type StartsideProps = StateProps & RouteComponentProps<MatchProps>;

class StartsideOrdinaer extends React.Component<StartsideProps> {
    render() {
        const { brukersNavn, history } = this.props;
        const { name } = brukersNavn.data;

        return (
            <section className="startside-ordinaer">
                <div className="startside-ordinaer__banner">
                    <div className="startside-ordinaer__intro">
                        <Undertittel tag="h1">
                            <FormattedMessage id="overskrift-start-dialog" values={{fornavn: hentFornavn(name)}}/>
                        </Undertittel>
                        <p className="typo-normal">
                            <FormattedMessage id="beskrivelse-start-dialog"/>
                        </p>
                    </div>
                    <img
                        className="startside-ordinaer__intro__ikon"
                        src={personSvg}
                        alt="Person-ikon"
                    />
                </div>
                <div className="startside-ordinaer__innhold">
                    <Innholdstittel className="tittel">
                        <FormattedMessage id="overskrift-start"/>
                    </Innholdstittel>
                    <Normaltekst className="beskrivelse"><FormattedMessage id="beskrivelse-start"/></Normaltekst>
                    <div className={'knapper-vertikalt'}>
                        <KnappBase
                            type="hoved"
                            onClick={() => history.push(`${SKJEMA_PATH}/0`)}
                            data-testid="start-registrering"
                        >
                            <FormattedMessage id="knapp-start"/>
                        </KnappBase>
                        <LenkeAvbryt tekstId="avbryt-lenke" wrapperClassname="no-anim"/>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    brukersNavn: selectBrukersNavn(state),
    registreringstatusData: selectRegistreringstatus(state).data,
});

export default connect(mapStateToProps)(StartsideOrdinaer);
