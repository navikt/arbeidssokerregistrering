import * as React from 'react';
import classNames from 'classnames';
import navAnsattSvg from './nav-ansatt.svg';
import './feilmelding.less';

interface FeilmeldingProps {
    bilde?: any;
    className?: string;
}

class Feilmelding extends React.Component<FeilmeldingProps> {
    render() {

        const { className, bilde } = this.props;
        const feilmeldingBilde = bilde ? bilde : navAnsattSvg;

        return (
            <div className={classNames('feilmelding', className)}>
                <img src={feilmeldingBilde} className="feilmelding__ikon" alt={!bilde ? 'NAV-ansatt' : ''}/>
                <div className="feilmelding__innhold">
                    {this.props.children}
                </div>
            </div>
        );

    }
}

export default Feilmelding;
