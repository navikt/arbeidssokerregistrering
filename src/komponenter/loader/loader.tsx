import * as React from 'react';

interface LoaderProps {
    tittelElement?: React.ReactNode;
}

export default class Loader extends React.Component<LoaderProps> {

    /*
        Har flyttet ut spinner komponent i nav-frontend-spinner
        TODO Ta i bruk det i bruk når PR'en er merget
    */
    render() {
        return (
            <div className="loader">
                <div className="spinner spinner--xxl" aria-label="Laster innhold">
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
                {this.props.tittelElement}
            </div>
        );
    }
}
