import * as React from 'react';
import { fungererAnimasjonIdenneNettleseren } from '../../utils/nettleser-sjekk';

export default class AvsjekkAnimasjon extends React.Component {

    render() {
        const brukAnimering = fungererAnimasjonIdenneNettleseren();

        return (
            <div className="avsjekk-animasjon">
                <svg
                    role="img"
                    aria-labelledby="resultatside_title"
                    className="avsjekk-animasjon__bilde"
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 128 128"
                >
                    <polyline
                        className={brukAnimering ? '' : 'hake'}
                        stroke="#99BDCD"
                        strokeWidth="9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        points="38.9,51.8 64.9,77.7 121.6,10.1"
                    />
                    <path
                        className={brukAnimering ? '' : 'sirkel'}
                        stroke="#CCDEE6"
                        strokeWidth="9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        d="M91.88,12.56A55,55,0,1,0,117.4,48.4"
                    />
                </svg>
                
            </div>
        );
    }
}
