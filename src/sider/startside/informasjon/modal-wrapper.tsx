import * as React from 'react';
import Modal from 'react-modal';
import classNames from 'classnames';
import Lukkeknapp from './lukkeknapp';
import './react-modal.less';
import './modal-wrapper-style.less';

const cls = (
    className: any // tslint:disable-line
) => classNames('modal', className);

interface Props {
    closeButton?: boolean;
    isOpen: boolean;
    children: React.ReactNode;
    onAfterOpen?: () => void;
    onRequestClose: () => void;
    shouldCloseOnOverlayClick?: boolean;
    closeTimeoutMS?: number;
    contentClass?: string;
    className?: string;
    overlayClassName?: string;
    portalClassName?: string;
}

class ModalWrapper extends React.Component<Props> {

    static defaultProps = {
        closeButton: true,
        shouldCloseOnOverlayClick: true,
        closeTimeoutMS: 0,
        contentClass: null,
        onAfterOpen: () => null
    };

    closeButtonRef: Lukkeknapp | null;
    modalRef: any; // tslint:disable-line

    static setAppElement(element: HTMLElement) {
        Modal.setAppElement(element);
    }

    constructor(props: Props) {
        super(props);
        this.onRequestClose = this.onRequestClose.bind(this);
    }

    onRequestClose(evt: any) { // tslint:disable-line
        const { onRequestClose, shouldCloseOnOverlayClick } = this.props;
        if (shouldCloseOnOverlayClick || evt.type === 'keydown') {
            onRequestClose();
        } else if (this.closeButtonRef) {
            this.closeButtonRef.focus();
        } else {
            this.modalRef.portal.refs.content.focus();
        }
    }

    render() {
        const { children, className, closeButton, shouldCloseOnOverlayClick, contentClass, ...props } = this.props;
        return (
            <Modal
                {...props}
                className={cls(className)}
                onRequestClose={this.onRequestClose}
                overlayClassName="informasjon-modal__overlay"
                shouldCloseOnOverlayClick={true}
                ref={(modalRef) => (this.modalRef = modalRef)}
            >
                <section className={contentClass}>
                    {children}
                </section>
                { closeButton &&
                    <Lukkeknapp
                        overstHjorne={true}
                        className={classNames('informasjon-modal__lukkknapp--shake')}
                        onClick={props.onRequestClose}
                        ref={(closeButtonRef) => (this.closeButtonRef = closeButtonRef)}
                    >
                        Lukk modal
                    </Lukkeknapp>
                }
            </Modal>
        );
    }
}

export default ModalWrapper;
