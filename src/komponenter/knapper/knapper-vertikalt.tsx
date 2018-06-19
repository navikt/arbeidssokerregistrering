import * as React from 'react';

interface KnappervertikaltProps {
    children: Array<React.ReactElement<Element>>;
    flag?: number;
}

function Knappervertikalt({ children }: KnappervertikaltProps) {
    const style = {
        animation: 'slideUp 2s both'
    };
    return(
        <div className="knapper-vertikalt" style={style}>
            {children}
        </div>
    );
}

export default Knappervertikalt;
