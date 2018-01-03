import * as React from 'react';

interface PanelBlokkProps {
    children?: Array<React.ReactElement<Element>> | React.ReactElement<Element>;
    knappAksjoner?: Array<React.ReactElement<Element>> | React.ReactElement<Element>;
}

function PanelBlokkGruppe({knappAksjoner, children}: PanelBlokkProps) {
    return (
        <div>
            <div className="blokk">
                {children}
            </div>
            <div className="panel-blokk__knapperad">
                {knappAksjoner}
            </div>
        </div>
    );
}

export default PanelBlokkGruppe;