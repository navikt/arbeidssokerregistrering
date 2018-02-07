import * as React from 'react';

interface KnapperadProps {
    children: Array<React.ReactElement<Element>>;
}

function Knapperad({ children }: KnapperadProps) {
    return(
        <div className="panel-blokk__knapperad">
            {children}
        </div>
    );
}

export default Knapperad;