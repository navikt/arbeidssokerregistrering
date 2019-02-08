import * as React from 'react';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import Banner from '../../komponenter/banner/banner';
import { Innholdstittel } from 'nav-frontend-typografi';
import { lagAktivitetsplanUrl } from '../../utils/url-utils';
import './allerede-registrert-fss.less';

type Props = InjectedIntlProps;

class AlleredeRegistrertFss extends React.Component<Props> {
    render() {
        return (
            <>
                <Banner />
                <div className="allerede-registrert-fss">
                    <Innholdstittel className="allerede-registrert-fss__tittel">
                        <FormattedMessage id="allerede-registrert-fss-tittel" />
                    </Innholdstittel>
                    <a className="knapp knapp--hoved allerede-registrert-fss__knapp" href={lagAktivitetsplanUrl()}>
                        <FormattedMessage id="allerede-registrert-fss-knapp" />
                    </a>
                </div>
            </>
        );
    }
}

export default injectIntl(AlleredeRegistrertFss);
