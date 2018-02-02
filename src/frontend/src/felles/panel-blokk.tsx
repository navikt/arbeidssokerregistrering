import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import * as classNames from 'classnames';
import { Panel } from 'nav-frontend-paneler';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { getIntlMessage } from '../utils/utils';

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
                        intl,
                        children}: PanelBlokkProps & InjectedIntlProps) {
    return (
        <Panel className={classNames('panel-blokk padding-vertikalt-standard mmb', cssVariant)}>
            {tittelId ?
                <Sidetittel className={`panel-blokk-overskrift ${tittelCssNavnVariant}`}>
                    <span>
                        {
                            intl.formatMessage(
                                {
                                    id: tittelId,
                                    defaultMessage: getIntlMessage(intl.messages, tittelId)
                                },
                                tittelVerdier)
                        }
                    </span>
            </Sidetittel> : null}
            {beskrivelseId ?
                <Normaltekst className="panel-blokk-beskrivelse">
                    <span
                        dangerouslySetInnerHTML={{
                            __html: getIntlMessage(intl.messages, beskrivelseId)
                        }}
                    />
                </Normaltekst>
                : null}
            {children}
        </Panel>
    );
}

export default injectIntl(PanelBlokk);
