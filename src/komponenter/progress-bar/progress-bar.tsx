import * as React from 'react';

interface OwnProps {
    gjeldendeSporsmal: number;
    antallSporsmal: number;
}

export default class ProgressBar extends React.Component<OwnProps> {
    private framdriftContainer: HTMLDivElement;
    private framdriftIndikator: HTMLDivElement;

    scrolling() {
        let scrollHeight = 0;
        const header = document.querySelector('.siteheader');
        if (header) {
            scrollHeight = header.getBoundingClientRect().height;
        }
        if (window.pageYOffset >= scrollHeight) {
            if (this.framdriftContainer) {
                this.framdriftContainer.classList.add('framdrift-fixed');
            }
        } else {
            if (this.framdriftContainer) {
                this.framdriftContainer.classList.remove('framdrift-fixed');
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
        const {gjeldendeSporsmal, antallSporsmal} = this.props;
        const framdriftBredde = Math.round((gjeldendeSporsmal / antallSporsmal) * 100);

        /** @type {{search: React.CSSProperties}} */
        const framdriftStyle = {
            width: framdriftBredde + '%'
        };

        return (
            <div>
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
