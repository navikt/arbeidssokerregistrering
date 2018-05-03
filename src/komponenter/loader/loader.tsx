import * as React from 'react';
import { fungererAnimasjonIdenneNettleseren } from '../../utils/nettleser-sjekk';

interface LoaderProps {
    tittelElement?: React.ReactNode;
}

export default class Loader extends React.Component<LoaderProps> {

    render() {
        const brukAnimering = fungererAnimasjonIdenneNettleseren();

        return (
            <div className="loader">
                <svg
                    role="img"
                    aria-labelledby="resultatside_title"
                    className="loader__bilde"
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 128 128"
                >

                    <g>
                        <line
                            className={brukAnimering ? '' : 'rettlinje'}
                            x1="40"
                            x2="90"
                            y1="60"
                            y2="60"
                            stroke="#99BDCD"
                            strokeWidth="9"
                            strokeLinecap="round"
                        />
                        <line
                            className={brukAnimering ? '' : 'rettlinje-liten'}
                            x1="38"
                            x2="70"
                            y1="71"
                            y2="71"
                            stroke="#99BDCD"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />
                    </g>

                    <circle
                        className={brukAnimering ? '' : 'sirkel'}
                        strokeLinecap="round"
                        strokeWidth="9"
                        fill="none"
                        stroke="#CCDEE6"
                        r="55"
                        cy="65"
                        cx="65"
                    />
                </svg>
                {this.props.tittelElement}
            </div>
        );
    }
}
