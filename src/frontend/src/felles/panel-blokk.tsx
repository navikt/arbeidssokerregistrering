import * as React from 'react';
import { Panel } from 'nav-frontend-paneler';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

interface PanelBlokkProps {
    tittelId?: string;
    tittelVerdier?: {};
    tittelCssNavnVariant?: string;
    cssVariant?: string;
    beskrivelseId?: string;
    children?: Array<React.ReactElement<Element>> | React.ReactElement<Element>;
}

function PanelBlokk({
                        tittelId,
                        beskrivelseId,
                        tittelCssNavnVariant,
                        cssVariant,
                        tittelVerdier,
                        children}: PanelBlokkProps) {
    return (
        <Panel className={`panel-blokk padding-vertikalt-standard ${cssVariant} mmb`}>
            {tittelId ?
                <Sidetittel className={`panel-blokk-overskrift panel-blokk-overskrift__${tittelCssNavnVariant}`}>
                    <FormattedMessage id={tittelId} values={tittelVerdier}/>
            </Sidetittel> : null}
            {beskrivelseId ?
                <Normaltekst className="panel-blokk-beskrivelse">
                    <FormattedMessage id={beskrivelseId}/>
                </Normaltekst>
                : null}
            {children}
        </Panel>
    );
}

export default PanelBlokk;