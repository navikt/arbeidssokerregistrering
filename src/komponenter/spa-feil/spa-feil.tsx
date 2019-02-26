import * as React from 'react';
import './spa-feil.less';

interface SpaFeilProps {
    appNavn: string;
}

const SpaFeil: React.SFC<SpaFeilProps> = ({ appNavn }: SpaFeilProps) => {
    return <div className="spa-feil">Feil i {appNavn}</div>;
};

export default SpaFeil;
