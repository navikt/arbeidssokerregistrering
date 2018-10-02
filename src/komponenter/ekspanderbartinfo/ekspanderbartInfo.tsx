import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import Ikon from 'nav-frontend-ikoner-assets';
import { getIntlMessage } from '../../utils/utils';
import { frontendLogger } from '../../metrikker/metrics-utils';

interface Props {
    tittelId: string;
    children?: Array<React.ReactElement<Element>> | React.ReactElement<Element>;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

type EgenProps = Props & InjectedIntlProps;

interface EgenStateProps {
    apen: boolean;
}

class EkspanderbartInfo extends React.PureComponent<EgenProps, EgenStateProps> {
    constructor(props: EgenProps) {
        super(props);
        this.state = {
            apen: false,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        const {onClick} = this.props;
        if (onClick) {
            onClick(e);
        }
        this.setState({
            apen: !this.state.apen
        },() => { // tslint:disable-line
            if (this.state.apen) {
                frontendLogger(this.props.tittelId + '.ekspandert');
            }
        });
    }

    render() {
        const {className} = this.props;
        return (
            <div className={className}>
                <button
                    className="knapp-reset ekspanderbartinfo__knapp"
                    onClick={this.handleClick}
                    aria-expanded={this.state.apen}
                >
                    <Normaltekst className="ekspanderbartinfo__label">
                        <Ikon kind="help-circle" size={25} className="ekspanderbartinfo__ikon"/>
                        {getIntlMessage(this.props.intl.messages, this.props.tittelId)}
                    </Normaltekst>
                </button>
                {this.state.apen && <div className="ekspanderbartinfo__innhold">{this.props.children}</div>}
            </div>
        );
    }
}

export default injectIntl(EkspanderbartInfo);
