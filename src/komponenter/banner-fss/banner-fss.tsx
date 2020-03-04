import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import infoIkon from './info-ikon.svg';
import './banner-fss.less';
import { getTekst } from '../../utils/utils';

interface BannerFssProps {
    tekstId: string;
}

class BannerFss extends React.Component<BannerFssProps> {
    render() {
        return (
            <div className="banner-fss">
                <img className="banner-fss__ikon" src={infoIkon} alt="Info ikon"/>
                <Normaltekst tag="h1">
                    { getTekst(this.props.tekstId, 'nb') }
                </Normaltekst>
            </div>
        );
    }
}

export default BannerFss;
