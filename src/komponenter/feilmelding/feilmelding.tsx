import * as React from 'react';

const navAnsattSvg = require('./nav-ansatt.svg');

class Feilmelding extends React.Component {
    render() {
        return (
            <div className="feilmelding">
                <img src={navAnsattSvg} className="feilmelding__ikon" alt="NAV-ansatt"/>
                <div className="feilmelding__innhold">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Feilmelding;