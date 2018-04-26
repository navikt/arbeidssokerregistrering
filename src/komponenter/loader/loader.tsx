import * as React from 'react';
import { Ingress } from 'nav-frontend-typografi';
import { getIEVersion, getTridentVersion } from '../../utils/ie-test';

export default class Loader extends React.Component {

    render() {
        const erIE = getIEVersion() > -1 || getTridentVersion() > -1;

        return (
            <div className="loader">
                <div>
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
                                className={erIE ? '' : 'rettlinje'}
                                x1="40"
                                x2="90"
                                y1="60"
                                y2="60"
                                stroke="#99BDCD"
                                strokeWidth="10"
                                strokeLinecap="round"
                            />
                            <line
                                className={erIE ? '' : 'rettlinje-liten'}
                                x1="38"
                                x2="70"
                                y1="73"
                                y2="73"
                                stroke="#99BDCD"
                                strokeWidth="5"
                                strokeLinecap="round"
                            />
                        </g>

                        <circle
                            className={erIE ? '' : 'sirkel'}
                            strokeLinecap="round"
                            strokeWidth="10"
                            fill="none"
                            stroke="#CCDEE6"
                            r="55"
                            cy="65"
                            cx="65"
                        />

                    </svg>
                </div>
                <Ingress tag="p">
                    Registrering pågår. Vi setter opp tjenester til deg. Dett kan ta noen sekunder
                </Ingress>
            </div>
        );
    }
}
