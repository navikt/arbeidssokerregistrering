import * as React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import { START_PATH } from '../../utils/konstanter';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import Animasjon from '../../sider/skjema/animasjon';

function Banner(props: InjectedIntlProps) {
    return (document.location.pathname.includes(START_PATH)) ? (null) : (
        <Animasjon flag={document.location.href}>
            <div className="registrering-banner">
                <Systemtittel tag="h1">
                    {props.intl.messages['banner-overskrift']}
                </Systemtittel>
            </div>
        </Animasjon>
    );
}

export default injectIntl(Banner);
