import * as React from 'react';
import { Innholdstittel, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import ModalWrapper from './modal-wrapper';

import './informasjon-modal.less';

interface Props {
    onRequestClose: () => void;
    header?: React.ReactNode;
    isOpen: boolean;
}

class InformasjonModal extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

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
                <Innholdstittel tag="h1" className="informasjon-modal__innholdstittel">tset</Innholdstittel>
                <Normaltekst className="informasjon-modal__ingress">test</Normaltekst>
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
                <Undertittel tag="h2" className="informasjon-modal__undertittel">test</Undertittel>
                <div className="informasjon-modal__innhold">
                    test
                </div>
            </ModalWrapper>
        );
    }
}

export default InformasjonModal;
