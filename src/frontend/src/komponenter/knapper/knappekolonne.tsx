import * as React from 'react';
import * as classnames from 'classnames';

interface KnappekolonneProps {
    children: Array<React.ReactElement<Element>>;
    className?: string;
}

function Knappekolonne({ children, className }: KnappekolonneProps) {
    return(
        <div className={classnames('knappekolonne', className)}>
            {children}
        </div>
    );
}

export default Knappekolonne;