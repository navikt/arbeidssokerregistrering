import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SpaFeil from '../komponenter/spa-feil/spa-feil';
import SpaMock from '../komponenter/spa-mock/spa-mock';
import RetryInterval from './retry-interval';

interface NAVSPAScope {
    [name: string]: NAVSPAApp;
}

interface State {
    hasError: boolean;
}

type NAVSPAApp = (element: HTMLElement, props: any) => void;

export default class NAVSPA {

    private static scope: NAVSPAScope = ((window as any).NAVSPA = (window as any).NAVSPA || {});

    public static importer<PROPS>(name: string): React.ComponentType<PROPS> {
        class NAVSPAImporter extends React.Component<PROPS, State> {

            state = { hasError: false };

            private el?: HTMLElement;
            private retryInterval?: RetryInterval;

            public componentDidCatch(error: Error) {
                this.setState({ hasError: true });
            }

            public componentDidMount() {
                this.retryInterval = new RetryInterval(this.initHandler);
                this.retryInterval.start();
            }

            public componentWillUnmount() {
                if (this.el) {
                    ReactDOM.unmountComponentAtNode(this.el);
                }
            }

            public render() {
                if (process.env.REACT_APP_MOCK) {
                    return <SpaMock name={name}/>;
                }

                if (this.state.hasError) {
                    return <SpaFeil name={name} />;
                }

                return <div ref={this.saveRef} />;
            }

            private saveRef = (el: HTMLDivElement) => {
                this.el = el;
            }

            private initHandler = (retryInterval: RetryInterval) => {
                try {
                    if (this.el) {
                        NAVSPA.scope[name](this.el, this.props);
                        retryInterval.stop();
                    }
                } catch (e) {
                    retryInterval.decreaseRetry();
                    if (!retryInterval.hasMoreRetries()) {
                        this.setState({ hasError: true });
                    }
                }
            }

        }

        return NAVSPAImporter;
    }

}
