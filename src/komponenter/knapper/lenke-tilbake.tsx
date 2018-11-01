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

    return (
        <a
            href="javascript:void(0);"
            className="tilbakelenke typo-element"
            onClick={() => {
                onClick();
                hideProgressbar();
            }}
        >
            Tilbake
        </a>
    );
}

export default LenkeTilbake;
