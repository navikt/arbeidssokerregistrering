import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import infoIkon from './info-ikon.svg';
import './banner-fss.less';
import alleTekster from '../../tekster'
const tekster = alleTekster.nb

interface BannerFssProps {
    tekstId: string;
}

class BannerFss extends React.Component<BannerFssProps> {

    render() {
        return (
            <div className="banner-fss">
                <img className="banner-fss__ikon" src={infoIkon} alt="Info ikon"/>
                <Normaltekst tag="h1">
                    { tekster[this.props.tekstId] }
                </Normaltekst>
            </div>
        );
    }

}

export default BannerFss;
