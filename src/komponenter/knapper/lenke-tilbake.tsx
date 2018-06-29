import * as React from 'react';

const onClick = () => {
    window.history.back();
};

function LenkeTilbake() {
    return (
        <a href="#" className="tilbakelenke typo-element" onClick={onClick}>Tilbake</a>
    );
}

export default LenkeTilbake;
