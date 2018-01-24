import * as React from 'react';
import * as classNames from 'classnames';

interface PanelBlokkProps {
    children?: Array<React.ReactElement<Element>> | React.ReactElement<Element>;
    knappAksjoner?: Array<React.ReactElement<Element>> | React.ReactElement<Element>;
    className?: string;
}

function PanelBlokkGruppe({knappAksjoner, children, className}: PanelBlokkProps) {
    return (
        <div>
            <div className={classNames('blokk', className)}>
                {children}
            </div>
            <div className="panel-blokk__knapperad">
                {knappAksjoner}
            </div>
        </div>
    );
}

export default PanelBlokkGruppe;