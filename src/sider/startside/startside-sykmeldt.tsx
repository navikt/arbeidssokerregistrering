import * as React from 'react';
import { parse } from 'query-string';
import { connect } from 'react-redux';
import { Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import KnappBase from 'nav-frontend-knapper';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { selectBrukersNavn, State as BrukersNavnState } from '../../ducks/brukers-navn';
import { INNGANGSSPORSMAL_PATH } from '../../utils/konstanter';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';
import { formaterDato, hentFornavn, MatchProps } from '../../utils/utils';
import { AppState } from '../../reducer';
import { selectRegistreringstatus, State as RegistreringStatusState } from '../../ducks/registreringstatus';
import veilederSvg from './veileder.svg';
import './startside.less';

interface StateProps {
    registreringStatus: RegistreringStatusState;
    brukersNavn: BrukersNavnState;
}

type StartsideProps = StateProps & RouteComponentProps<MatchProps>;

class StartsideSykmeldt extends React.Component<StartsideProps> {

    componentWillMount() {

        const { history, location } = this.props;
        const erFraSykefravaer = parse(location.search).fraSykefravaer;

        if (erFraSykefravaer) {
            history.push(INNGANGSSPORSMAL_PATH);
        }

    }

    render() {
        const { brukersNavn, history, registreringStatus } = this.props;
        const { name } = brukersNavn.data;
        const dato = formaterDato(registreringStatus.data.sykmeldtFraDato);

        return (
            <section className="startside">
                <div className="startside__banner">
                    <div className="startside__intro">
                        <Undertittel tag="h1">
                            <FormattedMessage
                                id="startside-overskrift-snakkeboble"
                                values={{fornavn: hentFornavn(name)}}
                            />
                        </Undertittel>
                        <p className="typo-normal">
                            <FormattedMessage
                                id="startside-sykmeldt-tekst-snakkeboble"
                                values={{dato}}
                            />
                        </p>
                    </div>
                    <img
                        className="startside__intro__ikon"
                        src={veilederSvg}
                        alt="Veileder-ikon"
                    />
                </div>
                <div className="startside__innhold">
                    <div className="knapper-vertikalt">
                        <KnappBase
                            type="hoved"
                            onClick={() => history.push(INNGANGSSPORSMAL_PATH)}
                            data-testid="start-registrering"
                        >
                            <FormattedMessage id="startside-sykmeldt-knapp"/>
                        </KnappBase>
                        <LenkeAvbryt tekstId="avbryt-lenke" wrapperClassname="no-anim"/>
                    </div>
                </div>
            </section>
        );
    }

}

const mapStateToProps = (state: AppState): StateProps => ({
    registreringStatus: selectRegistreringstatus(state),
    brukersNavn: selectBrukersNavn(state),
});

export default connect(mapStateToProps)(withRouter(StartsideSykmeldt));
