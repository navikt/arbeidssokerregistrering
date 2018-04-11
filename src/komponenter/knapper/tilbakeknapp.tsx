import * as React from 'react';
import { UndertekstBold } from 'nav-frontend-typografi';
import { OppChevron } from 'nav-frontend-chevron';

interface Props {
    onClick: () => void;
}

function Tilbakeknapp({onClick}: Props) {
    return(
        <div className="text-align-center">
            <button className="tilbakeknapp" onClick={onClick}>
                <OppChevron className="tilbake-chevron blokk-xxs"/>
                <UndertekstBold className="underline">Tilbake</UndertekstBold>
            </button>
        </div>
    );
}

export default Tilbakeknapp;