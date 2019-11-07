import * as React from 'react';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import ModalWrapper from './modal-wrapper';

import './informasjon-modal.less';
import VideotekstAccordion from './videotekst-accordion';

interface Props {
    onRequestClose: () => void;
    header?: React.ReactNode;
    isOpen: boolean;
}

class InformasjonModal extends React.Component<Props> {
    render () {
        return (
            <ModalWrapper
                isOpen={this.props.isOpen}
                className="informasjon-modal"
                overlayClassName="aktivitet-modal__overlay"
                portalClassName="aktivitetsplanfs aktivitet-modal-portal"
                shouldCloseOnOverlayClick={false}
                onRequestClose={this.props.onRequestClose}
            >
                <Innholdstittel tag="h1" className="informasjon-modal__innholdstittel">
                    <FormattedMessage id="registrering-arbeidssoker.informasjon-modal.tittel"/>
                </Innholdstittel>
                <Normaltekst className="informasjon-modal__ingress">
                    <FormattedHTMLMessage id="registrering-arbeidssoker.informasjon-modal.ingress"/>
                </Normaltekst>
                <iframe
                    title="onboarding-video"
                    frameBorder="0"
                    scrolling="no"
                    src={
                        'https://video.qbrick.com/play2/embed/player' +
                        '?accountId=763558' +
                        '&mediaId=74420478-00015227-993dea3a' +
                        '&configId=default' +
                        '&pageStyling=adaptive' +
                        '&autoplay=true' +
                        '&repeat=true' +
                        '&sharing=true'
                    }
                    className="informasjon-modal__video"
                />
                <VideotekstAccordion/>
            </ModalWrapper>
        );
    }
}

export default InformasjonModal;
