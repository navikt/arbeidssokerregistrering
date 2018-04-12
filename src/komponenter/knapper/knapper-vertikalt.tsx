import * as React from 'react';

interface KnappervertikaltProps {
    children: Array<React.ReactElement<Element>>;
}

function Knappervertikalt({ children }: KnappervertikaltProps) {
    return(
        <div className="knapper-vertikalt">
            {children}
        </div>
    );
}

export default Knappervertikalt;