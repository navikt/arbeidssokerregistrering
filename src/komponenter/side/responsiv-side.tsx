import * as React from 'react';
import * as classnames from 'classnames';

interface ResponsivSideProps {
    children: React.ReactNode;
    className?: string;
}

class ResponsivSide extends React.Component<ResponsivSideProps> {

    constructor(props: ResponsivSideProps) {
        super(props);
    }

    componentDidMount() {
        let scrollHeight = 0;
        const header = document.querySelector('.siteheader');
        if (header) {
            scrollHeight = header.getBoundingClientRect().height;
        }
        window.scrollTo(0, scrollHeight);
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
