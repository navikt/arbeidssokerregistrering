import * as React from 'react';
import { fungereAnimasjonIdenneNettleseren } from '../../utils/nettleser-sjekk';

export default class AvsjekkAnimasjon extends React.Component {

    render() {
        const erIE = fungereAnimasjonIdenneNettleseren();

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
                        className={erIE ? '' : 'hake'}
                        stroke="#99BDCD"
                        strokeWidth="9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        points="38.9,51.8 66.9,82.7 121.6,11.1 "
                    />
                    <path
                        className={erIE ? '' : 'sirkel'}
                        stroke="#CCDEE6"
                        strokeWidth="9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        d="M91.88,12.56A55,55,0,1,0,120.4,48.4"
                    />
                </svg>
                
            </div>
        );
    }
}
