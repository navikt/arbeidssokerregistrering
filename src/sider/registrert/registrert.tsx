import * as React from 'react';
import * as classnames from 'classnames';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { Systemtittel } from 'nav-frontend-typografi';
import AvsjekkBilde from './avsjekk-bilde/avsjekk-bilde';
import { erIE } from '../../utils/ie-test';
import { AppState } from '../../reducer';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { erIFSS, MatchProps } from '../../utils/utils';
import { RegistreringType } from '../../ducks/registreringstatus';
import RegistrertAksjonspanel from './aksjonspanel/registrert-aksjonspanel';
import RegistrertSendVidere from './send-videre-fss/registrert-send-videre';
import './registrert.less';

interface StateProps {
    state: AppState;
}

type AllProps = StateProps & InjectedIntlProps & RouteComponentProps<MatchProps>;

class DuErNaRegistrert extends React.Component<AllProps> {

    hentTekstId(erSykmeldt: boolean): (id: string) => string {
        return (id: string) => {
            return `duernaregistrert-${( erSykmeldt ? 'sykmeldt' : 'ordinaer')}-${id}`;
        };
    }

    render() {

        const registreringType = this.props.state.registreringStatus.data.registreringType;
        const erSykmeldt = registreringType === RegistreringType.SYKMELDT_REGISTRERING;
        const hentTekstId = this.hentTekstId(erSykmeldt);
        const tittelId = erIFSS() ? 'duernaregistrert-manuell-innholdstittel' : hentTekstId('innholdstittel');

        return (
            <section className={`registrert ${erIE() && 'erIE'}`}>

                <div
                    className={classnames('registrert__avsjekk', erSykmeldt ?
                        'registrert__avsjekk-sykmeldt' : null)}
                >
                    <AvsjekkBilde/>
                    <Systemtittel tag="h1" className="registrert__tittel">
                        <FormattedMessage id={tittelId}/>
                    </Systemtittel>
                </div>
                { erIFSS() ?
                    <RegistrertSendVidere/>
                    :
                    <RegistrertAksjonspanel hentTekstId={this.hentTekstId(erSykmeldt)} erSykmeldt={erSykmeldt}/>
                }
            </section>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    state: state,
});

export default connect(mapStateToProps)(injectIntl(DuErNaRegistrert));
