import * as React from 'react';
import {Panel} from 'nav-frontend-paneler';
import {Normaltekst, Sidetittel} from 'nav-frontend-typografi';
import {FormattedMessage} from 'react-intl';

interface PanelBlokkProps {
    tittelId: string;
    tittelCssType: string;
    beskrivelseId: string;
    knappAksjoner?: Array<React.ReactElement<Element>> | React.ReactElement<Element>;
}

function PanelBlokk({tittelId, beskrivelseId, tittelCssType, knappAksjoner}: PanelBlokkProps) {
    return (
        <div>
            <Panel className="panel-blokk blokk-l">
                <Sidetittel className={`panel-blokk-overskrift ${tittelCssType}`}>
                    <FormattedMessage id={tittelId}/>
                </Sidetittel>
                <Normaltekst className="beskrivelse-start">
                    <FormattedMessage id={beskrivelseId}/>
                </Normaltekst>
            </Panel>
            <div className="panel-blokk__knapperad">
                {knappAksjoner}
            </div>
        </div>
    );
}

export default PanelBlokk;