import * as React from 'react';
import './lenke-tilbake.less';

interface Props {
    onClick: () => void;
}

function LenkeTilbake({onClick}: Props) {

    function hideProgressbar() {
        let framdrift = document.querySelector('.framdrift');
        framdrift!.classList.add('bakover');
        setTimeout(() => {
            framdrift!.classList.remove('bakover');
        }, 600);
    }

    const onclick = (e: any) => { // tslint:disable-line
        e.preventDefault();
        onClick();
        hideProgressbar();
    };

    return (
        <>
            {/* eslint-disable-next-line */}
            <a href="" className="lenke tilbakelenke typo-element" onClick={onclick}>Tilbake</a>
        </>
    );
}

export default LenkeTilbake;
