import * as React from 'react';
import classNames from 'classnames';

import './responsiv-side.less';

interface ResponsivSideProps {
    children: React.ReactNode;
    className?: string;
}

class ResponsivSide extends React.Component<ResponsivSideProps> {

    constructor(props: ResponsivSideProps) {
        super(props);
    }

    render() {
        const {children, className} = this.props;

        return (
            <section className={classNames('sporsmal', className)}>
                {children}
            </section>
        );
    }
}

export default ResponsivSide;
