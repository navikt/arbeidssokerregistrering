import * as React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import { START_PATH } from '../../utils/konstanter';

export default function Banner() {
    return (document.location.pathname.includes(START_PATH)) ? (null) : (
        <div className="registrering-banner">
            <Systemtittel tag="h1">
                Registrering
            </Systemtittel>
        </div>
    );
}