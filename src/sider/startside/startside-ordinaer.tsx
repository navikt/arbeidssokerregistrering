import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Innholdstittel, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import KnappBase from 'nav-frontend-knapper';
import { MatchProps } from '../../utils/utils';
import { selectBrukersNavn, State as BrukersNavnState } from '../../ducks/brukers-navn';
import { AppState } from '../../reducer';
import { SKJEMA_PATH } from '../../utils/konstanter';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';

import personSvg from './person-komprimert.svg';
import './startside.less';

interface StateProps {
    brukersNavn: BrukersNavnState;
}

type StartsideProps = StateProps & RouteComponentProps<MatchProps>;

class StartsideOrdinaer extends React.Component<StartsideProps> {
    render() {
        const { brukersNavn, history } = this.props;
        const { fornavn } = brukersNavn.data;

        return (
            <section className="startside">
                <div className="startside__banner">
                    <div className="startside__intro">
                        <Undertittel tag="h1">
                            <FormattedMessage
                                id="startside-overskrift-snakkeboble"
                                values={{fornavn: fornavn}}
                            />
                        </Undertittel>
                        <p className="typo-normal">
                            <FormattedMessage id="startside-ordinaer-tekst-snakkeboble"/>
                        </p>
                    </div>
                    <img
                        className="startside__intro__ikon"
                        src={personSvg}
                        alt="Person-ikon"
                    />
                </div>
                <div className="startside__innhold">
                    <Innholdstittel className="tittel">
                        <FormattedMessage id="startside-ordinaer-overskrift"/>
                    </Innholdstittel>
                    <Normaltekst className="ingress"><FormattedMessage id="startside-ordinaer-ingress"/></Normaltekst>
                    <div className={'knapper-vertikalt'}>
                        <KnappBase
                            type="hoved"
                            onClick={() => history.push(`${SKJEMA_PATH}/0`)}
                            data-testid="start-registrering"
                        >
                            <FormattedMessage id="startside-ordinaer-knapp"/>
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
});

export default connect(mapStateToProps)(StartsideOrdinaer);
