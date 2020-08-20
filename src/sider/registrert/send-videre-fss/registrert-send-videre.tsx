import * as React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Normaltekst } from 'nav-frontend-typografi';
import { lagDetaljeVisningUrl } from '../../../utils/url-utils';
import './registrert-send-videre.less';

class RegistrertSendVidere extends React.Component<WithTranslation> {

    // NB: Tiden for animasjonen er 6000ms, ikke redirect før dette
    private readonly REDIRECT_AFTER = 11000;

    componentDidMount() {
        setTimeout(this.sendVidereTilDetaljer, this.REDIRECT_AFTER);
    }

    sendVidereTilDetaljer = () => {
        window.location.href = lagDetaljeVisningUrl();
    }

    render() {
        const { t } = this.props;

        return (
            <div className="registrert-send-videre">
                <Normaltekst className="registrert-send-videre__tekst">
                    {t('duernaregistrert-manuell-normaltekst')}
                </Normaltekst>
                <a
                    className="knapp knapp--hoved registrert-send-videre__lenke"
                    href={lagDetaljeVisningUrl()}
                >
                    {t('duernaregistrert-manuell-lenke-videre')}
                </a>
            </div>
        );
    }
}

export default withTranslation()(RegistrertSendVidere);
