import * as React from 'react';

interface OwnProps {
    gjeldendeSporsmal: number;
    antallSporsmal: number;
    offset: number;
}

export default class ProgressBar extends React.Component<OwnProps> {
    private framdriftContainer: HTMLDivElement;
    private framdriftWrapper: HTMLDivElement;
    private framdriftIndikator: HTMLDivElement;

    scrolling() {
        const REGISTRERING_BANNER_HEIGHT = 0;
        let scrollHeight = REGISTRERING_BANNER_HEIGHT;
        const header = document.querySelector('.siteheader');
        const banner = document.querySelector('.registrering-banner');
        if (header) {
            scrollHeight += header.getBoundingClientRect().height;
        }
        if (banner) {
            scrollHeight += banner.getBoundingClientRect().height;
        }
        if (window.pageYOffset > scrollHeight) {
            if (this.framdriftContainer) {
                this.framdriftContainer.classList.add('framdrift-fixed');
            }
            if (this.framdriftWrapper) {
                this.framdriftWrapper.classList.add('framdrift-wrapper');
            }
        } else {
            if (this.framdriftContainer) {
                this.framdriftContainer.classList.remove('framdrift-fixed');
            }
            if (this.framdriftWrapper) {
                this.framdriftWrapper.classList.remove('framdrift-wrapper');
            }
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', () => {
            this.scrolling();
        });
    }

    componentDidUpdate() {
        this.scrolling();
    }

    render() {
        const {gjeldendeSporsmal, antallSporsmal, offset} = this.props;
        const framdriftBredde = Math.min(
            100,
            Math.round(offset + (gjeldendeSporsmal / (antallSporsmal - 1)) * 100)
        );

        /** @type {{search: React.CSSProperties}} */
        const framdriftStyle = {
            width: framdriftBredde + '%'
        };

        return (
            <div ref={(div: HTMLDivElement) => this.framdriftWrapper = div}>
                <div
                    ref={(div: HTMLDivElement) => this.framdriftContainer = div}
                    className="framdrift"
                    role="progressbar"
                    aria-valuenow={Math.round(framdriftBredde)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    tabIndex={-1}
                >
                    <div
                        ref={(div: HTMLDivElement) => this.framdriftIndikator = div}
                        className="andel"
                        style={framdriftStyle}
                    />
                    {this.scrolling()}
                </div>
            </div>
        );
    }
}
