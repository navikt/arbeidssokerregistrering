import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SpaFeil from '../komponenter/spa-feil/spa-feil';
import SpaMock from '../komponenter/spa-mock/spa-mock';

// tslint:disable no-any

interface NAVSPAScope {
    [name: string]: NAVSPAApp;
}
type NAVSPAApp = (element: HTMLElement, props: any) => void;

interface State {
    hasError: boolean;
}

export default class NAVSPA {

    private static scope: NAVSPAScope = ((window as any).NAVSPA = (window as any).NAVSPA || {});

    public static importer<PROPS>(name: string): React.ComponentType<PROPS> {
        class NAVSPAImporter extends React.Component<PROPS, State> {

            private el?: HTMLElement;

            constructor(props: PROPS) {
                super(props);
                this.state = {
                    hasError: false,
                };
            }

            public componentDidCatch(error: Error) {
                this.setState({ hasError: true });
            }

            public componentDidMount() {
                try {
                    if (this.el) {
                        NAVSPA.scope[name](this.el, this.props);
                    }
                } catch (e) {
                    this.setState({ hasError: true });
                }
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
        }

        return NAVSPAImporter;
    }

}
