import * as React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import { START_PATH } from '../../utils/konstanter';
import { InjectedIntlProps, injectIntl } from 'react-intl';

function Banner(props: InjectedIntlProps) {
    return (document.location.pathname.includes(START_PATH)) ? (null) : (
        <div className="registrering-banner">
            <Systemtittel tag="h1">
                {props.intl.messages['banner-overskrift']}
            </Systemtittel>
        </div>
    );
}

export default injectIntl(Banner);