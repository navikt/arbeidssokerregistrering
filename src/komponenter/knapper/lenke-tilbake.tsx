import * as React from 'react';
import * as classnames from 'classnames';
import './lenke-tilbake.less';

interface Props {
    onClick: () => void;
    className?: string;
}

function hideProgressbar() {
    let framdrift = document.querySelector('.framdrift');
    framdrift!.classList.add('bakover');
    setTimeout(() => {
        framdrift!.classList.remove('bakover');
    }, 600);
}

function LenkeTilbake({ onClick, className }: Props) {

    return (
        <a
            href="javascript:void(0);"
            className={classnames('tilbakelenke', 'typo-element', className)}
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
