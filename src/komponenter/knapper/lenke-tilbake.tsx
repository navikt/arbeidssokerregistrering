import * as React from 'react';
import './lenke-tilbake.less';

interface Props {
    onClick: () => void;
}

function LenkeTilbake({onClick}: Props) {
    return (
        <a href="javascript:void(0);" className="tilbakelenke typo-element" onClick={onClick}>Tilbake</a>
    );
}

export default LenkeTilbake;
