import * as React from 'react';
import * as classNames from 'classnames';
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
        <Panel className={classNames('panel-blokk padding-vertikalt-standard mmb', cssVariant)}>
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