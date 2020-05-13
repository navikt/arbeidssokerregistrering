import React from 'react';
import Lenke from "nav-frontend-lenker";

import link from './link.svg';
import './ekstern-lenke.less';

interface Props {
    url: string;
    tekst: string;
};

class EksternLenke extends React.Component<Props> {
    render() {
        const { url, tekst } = this.props;
        return (
            <Lenke href={`${url}`} className="blokk-m">
                <span >
                    <img className="icon" src={link} alt="Ekstern lenke" />
                    {tekst}
                </span>
            </Lenke>
        )
    }
};

export default EksternLenke;
