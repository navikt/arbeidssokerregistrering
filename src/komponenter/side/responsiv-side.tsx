import * as React from 'react';
import * as classnames from 'classnames';

interface ResponsivSideProps {
    children: React.ReactNode;
    className?: string;
}

function ResponsivSide({children, className}: ResponsivSideProps) {
    return(
        <section className={classnames('responsiv-side', className)}>
            {children}
        </section>
    );
}

export default ResponsivSide;