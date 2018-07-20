import * as React from 'react';
import * as classnames from 'classnames';
import { scrollToBanner } from '../../utils/utils';

interface ResponsivSideProps {
    children: React.ReactNode;
    className?: string;
}

class ResponsivSide extends React.Component<ResponsivSideProps> {

    constructor(props: ResponsivSideProps) {
        super(props);
    }

    componentDidMount () {
        scrollToBanner();
    }

    render() {
        const {children, className} = this.props;

        return (
            <section className={classnames('sporsmal', className)}>
                {children}
            </section>
        );
    }
}

export default ResponsivSide;
