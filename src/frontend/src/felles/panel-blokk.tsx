import * as React from 'react';
import { Panel } from 'nav-frontend-paneler';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

interface PanelBlokkProps {
    tittelId: string;
    tittelCssNavnVariant: string;
    beskrivelseId?: string;
    children?: Array<React.ReactElement<Element>> | React.ReactElement<Element>;
    knappAksjoner?: Array<React.ReactElement<Element>> | React.ReactElement<Element>;
}

function PanelBlokk({tittelId, beskrivelseId, tittelCssNavnVariant, knappAksjoner, children}: PanelBlokkProps) {
    return (
        <div>
            <Panel className="panel-blokk blokk-l">
                <Sidetittel className={`panel-blokk-overskrift panel-blokk-overskrift__${tittelCssNavnVariant}`}>
                    <FormattedMessage id={tittelId}/>
                </Sidetittel>
                {beskrivelseId ?
                    <Normaltekst className="panel-blokk-beskrivelse">
                        <FormattedMessage id={beskrivelseId}/>
                    </Normaltekst>
                    : null}
                {children}
            </Panel>
            <div className="panel-blokk__knapperad">
                {knappAksjoner}
            </div>
        </div>
    );
}

export default PanelBlokk;