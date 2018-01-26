import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import Ikon from 'nav-frontend-ikoner-assets';
import { getIntlMessage } from '../../utils/utils';

interface Props {
    tittelId: string;
    children?: Array<React.ReactElement<Element>> | React.ReactElement<Element>;
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

    handleClick() {
        this.setState({
            apen: !this.state.apen
        });
    }

    render() {
        return (
            <div className="bla-italic">
                <button
                    className="knapp-reset blokk-xxs"
                    onClick={this.handleClick}
                    aria-expanded={this.state.apen}
                >
                    <Normaltekst className="flex-align-items-start">
                        <span className="mmr"><Ikon kind="help-circle" size={25} className=""/></span>
                        {getIntlMessage(this.props.intl.messages, this.props.tittelId)}
                    </Normaltekst>
                </button>
                {
                    this.state.apen
                        ?
                        <div className="pxll">{this.props.children}</div>
                        : null
                }
            </div>
        );
    }
}

export default injectIntl(EkspanderbartInfo);