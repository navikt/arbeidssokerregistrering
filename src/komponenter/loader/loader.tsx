import * as React from 'react';

interface LoaderProps {
    tittelElement?: React.ReactNode;
}

export default class Loader extends React.Component<LoaderProps> {

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
