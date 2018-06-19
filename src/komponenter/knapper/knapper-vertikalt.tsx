import * as React from 'react';
import LenkeAvbryt from './lenke-avbryt';
import KnappNeste from './knapp-neste';

interface KnappervertikaltProps {
    children: Array<React.ReactElement<Element>>;
    flag?: number;
}

function Knappervertikalt({ children, flag }: KnappervertikaltProps) {
    console.log('Hei!'); // tslint:disable-line
    const style = {
        animation: 'slideUp 2s both'
    };
    return(
        <div className="knapper-vertikalt" style={style}>
            {children}
            <KnappNeste flag={flag} onClick={() => {/*tslint:disable-line*/}}/>
            <LenkeAvbryt/>
        </div>
    );
}

export default Knappervertikalt;
