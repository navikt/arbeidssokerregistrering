import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Input } from 'nav-frontend-skjema';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Stilling } from '../../../../ducks/siste-stilling';

import './autocomplete.less';
import { Undertittel } from 'nav-frontend-typografi';

// Hjelpe funksjon
const getIndexValgteElement = (resultat: any) => { // tslint:disable-line
    let indexElement;
    if (resultat) {
        for (let i = 0; i < resultat.children.length; i++) {
            if (resultat.children[i].getAttribute('aria-selected') === 'true') {
                indexElement = i;
            }
        }
    }
    return indexElement;
};

const keyboard = {
    back: 8, // delete key on mac
    tab: 9,
    enter: 13,
    shift: 16, // shiftKey = true
    ctrl: 17, // ctrlKey = true
    alt: 18, // (a.k.a. option on Mac) altKey = true
    esc: 27,
    space: 32,
    pageUp: 33, // fn + up on mac
    pageDown: 34, // fn + down on mac
    end: 35, // fn + right on mac
    home: 36, // fn + left on mac
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    del: 46, // fn + delete on mac
    command: 91 // metaKey = true (mac and sun machines)
};

interface ResultatListeProps {
    visSpinner: boolean;
    resultatListe: Resultater[];
    oppdaterState: (autoCompleteListIndex: any) => void; //tslint:disable-line
    clearSelected: () => void;
}

class ResultatListe extends React.Component<ResultatListeProps> {
    constructor(props: ResultatListeProps) {
        super(props);

        this.onOptionClick = this.onOptionClick.bind(this);
    }

    onOptionClick (e: any) { // tslint:disable-line
        this.props.oppdaterState(e.target.getAttribute('data-stilling-index'));
    }

    render () {
        if (this.props.visSpinner) {
            return <div className="autocomplete-form__tekst-laster">Laster innhold</div>;
        }
        return (
            <ul
                className="autocomplete-form__resultat-list"
                id="resultat"
                role="listbox"
                onClick={this.onOptionClick}
                onMouseOver={this.props.clearSelected}
                aria-expanded={this.props.resultatListe.length !== 0}
            >
                {this.props.resultatListe.map((e, i) => {
                    return (
                        <li
                            aria-selected="false"
                            data-stilling-index={i}
                            key={i}
                            role="option"
                            tabIndex={-1}
                        >
                            {e.labelKey}
                        </li>
                    );
                })}
            </ul>
        );
    }
}

interface Resultater {
    stilling: Stilling;
    labelKey: string;
    id: number;
}

interface AutoCompleteProps {
    value: string;
    visSpinner: boolean;
    onChange: (e: any) => void; //tslint:disable-line
    resultatListe: Resultater[];
    oppdaterState: (autoCompleteListIndex: any) => void; //tslint:disable-line
    oppdaterDefaultState: () => void;
    resetValue: () => void;
}

interface AutoCompleteState {
    inputValue: string;
}

type Props = AutoCompleteProps & InjectedIntlProps;
class AutoComplete extends React.Component<Props, AutoCompleteState> {

    // TODO: fix any
    formRef: any; // tslint:disable-line
    static clickLabel() {
        document.getElementById('stilling')!.focus();
    }

    constructor(props: Props) {
        super(props);

        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);

        this.setFormRef = this.setFormRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);

    }

    componentDidUpdate() {
        const numberResults = this.props.resultatListe.length;
        if (numberResults === 0) {
            this.closeResults();
        } else {
            this.openResults();
        }

        this.toggleSpinner(this.props.visSpinner);

        const ariaLive = document.querySelector('.autocomplete-form__screen-reader-text[aria-live]');
        if (ariaLive) {
            ariaLive.textContent = numberResults === 0
                ? '' : numberResults + ' resultater er tilgjengelige.';
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    setFormRef(node: React.ReactNode) {
        this.formRef = node;
    }
    handleClickOutside(event: Event) {
        if (this.formRef && !this.formRef.contains(event.target)) {
            this.props.oppdaterDefaultState();
        }
    }

    scrollTilMarkertElement(selectionToMark: HTMLElement) {
        const resultat = document.getElementById('resultat');
        if (resultat) {
            resultat.scrollTop = selectionToMark.offsetTop - (resultat.offsetHeight - 40);
        }
    }
    // TODO: fix any
    markSelected(selectionToMark: any) {  // tslint:disable-line
        if (selectionToMark) {
            selectionToMark.setAttribute('aria-selected', 'true');
            this.scrollTilMarkertElement(selectionToMark);
        } else {
            return;
        }
        const activeItemId = 'selectedOption';
        selectionToMark.setAttribute('id', activeItemId);
        const inputEl = document.querySelector('[aria-owns="resultat"]');
        if (inputEl) {
            inputEl.setAttribute('aria-activedescendant', activeItemId);
        }

    }
    clearSelected() {
        const resultat = document.getElementById('resultat');
        const indexElement = getIndexValgteElement(resultat);

        if (resultat && indexElement !== undefined) {
            resultat.children[indexElement].setAttribute('aria-selected', 'false');
            resultat.children[indexElement].setAttribute('aria-activedescendant', '');
            resultat.children[indexElement].setAttribute('id', '');
        }
    }
    arrowing(kc: number) {
        const resultat = document.getElementById('resultat');
        const indexElement = getIndexValgteElement(resultat);

        let nextMenuItem;
        if (this.props.resultatListe.length === 0) {
            return;
        }

        if (resultat) {
            if (kc === keyboard.down) {
                nextMenuItem = (indexElement !== undefined)
                        ? resultat.children[indexElement + 1]
                    : resultat.children[0];
            }

            if (kc === keyboard.up) {
                nextMenuItem = (indexElement !== undefined)
                    ? resultat.children[indexElement - 1]
                    : resultat.children[resultat.children.length - 1];
            }
        }

        this.clearSelected();
        this.markSelected(nextMenuItem);
    }

    closeResults() {
        this.clearSelected();
        this.toggleResultatListe(false);
    }
    openResults() {
        this.toggleResultatListe(true);
    }

    onKeyUp (e: any) { //tslint:disable-line
        const kc = e.keyCode;
        const key = keyboard;
        if (kc === key.up || kc === key.down || kc === key.tab || kc === key.enter || kc === key.esc) {
            return;
        }
    }

    onKeyDown (e: any) { //tslint:disable-line
        const oppdaterStateOnKeyDown = () => {
            const resultat = document.getElementById('resultat');
            const indexElement = getIndexValgteElement(resultat);
            if (indexElement !== undefined) {
                this.props.oppdaterState(indexElement);
            } else {
                this.props.oppdaterDefaultState();
            }
        };
        const kc = e.keyCode;
        if (kc === keyboard.up || kc === keyboard.down) {
            e.preventDefault();
            this.arrowing(kc);
            return;
        }

        if (kc === keyboard.tab) {
            oppdaterStateOnKeyDown();
            return;
        }

        if (kc === keyboard.esc) {
            this.props.oppdaterDefaultState();
            return;
        }

        if (kc === keyboard.enter) {
            e.preventDefault();
            oppdaterStateOnKeyDown();
            return;
        }
    }

    toggleSpinner(skalVises: boolean) {
        const spinner = document.getElementById('spinner');
        if (spinner) {
            if (skalVises) {
                spinner.style.display = 'block';
            } else {
                spinner.style.display = 'none';
            }
        }
    }

    toggleResultatListe(skalVises: boolean) {
        const resultatOptions = document.getElementById('resultat');
        if (resultatOptions) {
            if (skalVises) {
                resultatOptions.style.display = 'block';
            } else {
                resultatOptions.style.display = 'none';
            }

        }
    }

    render() {
        const { resultatListe, oppdaterState, visSpinner, value, onChange, resetValue, intl} = this.props;
        return (
            <form className="autocomplete-form" ref={this.setFormRef} action="">
                <Input
                    autoFocus={true}
                    onKeyDown={this.onKeyDown}
                    onKeyUp={this.onKeyUp}
                    onFocus={resetValue}
                    tab-index="0"
                    aria-owns="resultat"
                    autoComplete="off"
                    label={<Undertittel>{intl.messages['siste-arbeidsforhold.undertittel']}</Undertittel>}
                    id="stilling"
                    aria-autocomplete="both"
                    aria-describedby="initInstr"
                    value={value}
                    onChange={onChange}
                />

                <ResultatListe
                    resultatListe={resultatListe}
                    oppdaterState={oppdaterState}
                    visSpinner={visSpinner}
                    clearSelected={this.clearSelected}
                />

                <span id="initInstr">
                    Når resultatene er tilgjengelige bruk piltastene til å navigere og enter for å velge.
                    På mobile enheter, trykk eller sveip.
                </span>
                <div aria-live="assertive" className="autocomplete-form__screen-reader-text"/>
                <div className="autocomplete-form__spinner" id="spinner">
                    <NavFrontendSpinner type="XS" aria-label="Laster innhold" />
                </div>
            </form>
        );
    }
}

export default injectIntl(AutoComplete);
