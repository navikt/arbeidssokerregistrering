import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import Feilmelding from './feilmelding';
import { Normaltekst } from 'nav-frontend-typografi';
import { default as KnappBase } from 'nav-frontend-knapper';
import { getIntlMessage } from '../../utils/utils';
import PanelBlokkGruppe from '../panel-blokk/panel-blokk-gruppe';
import { VEILARBSTEPUP } from '../../ducks/api';

function StepUp({intl}: InjectedIntlProps) {
    return (
        <div className="stepup__wrapper">
            <PanelBlokkGruppe
                className="test-test"
                knappAksjoner={
                    <KnappBase
                        type="hoved"
                        className="stepup__knapp"
                        onClick={() => document.location.href = VEILARBSTEPUP}
                    >
                        <Normaltekst>{getIntlMessage(intl.messages, 'knapp-logg-inn')}</Normaltekst>
                    </KnappBase>
                }
            >
                <Feilmelding intl={intl} id="stepup-melding" type="info"/>
            </PanelBlokkGruppe>
        </div>
    );
}

export default StepUp;
