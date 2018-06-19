import * as React from 'react';

interface KnappervertikaltProps {
    children: Array<React.ReactElement<Element>>;
    className?: string;
}

function Knappervertikalt({ children, className }: KnappervertikaltProps) {
    return(
        <div className={'knapper-vertikalt ' + className}>
            {children}
        </div>
    );
}

export default Knappervertikalt;
