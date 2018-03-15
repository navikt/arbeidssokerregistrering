import * as React from 'react';
import * as classNames from 'classnames';
import ResponsivSide from '../side/responsiv-side';

interface PanelBlokkProps {
    children?: Array<React.ReactElement<Element>> | React.ReactElement<Element>;
    knappAksjoner?: Array<React.ReactElement<Element>> | React.ReactElement<Element>;
    className?: string;
}

function PanelBlokkGruppe({knappAksjoner, children, className}: PanelBlokkProps) {
    return (
        <ResponsivSide>
            <div className={classNames('blokk', className)}>
                {children}
            </div>
            {knappAksjoner ?
                <div className="panel-blokk__knapperad">
                    {knappAksjoner}
                </div>
                :
                null
            }
        </ResponsivSide>
    );
}

export default PanelBlokkGruppe;