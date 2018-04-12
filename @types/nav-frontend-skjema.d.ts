declare module "nav-frontend-skjema" {
    import * as React from "react";

    type InputBredde =
        | "fullbredde"
        | "xxl"
        | "xl"
        | "l"
        | "m"
        | "s"
        | "xs"
        | "xxs";

    type SelectBredde = "fullbredde" | "xxl" | "xl" | "l" | "m" | "s" | "xs";

    interface RadioProps extends React.HTMLProps<HTMLInputElement> {
        className?: string;
        id?: string;
        label: React.ReactNode | any;
        name: string;
        checked?: boolean;
        radioRef?: Function;
        defaultChecked?: boolean;
        value: string;
    }

    export interface Feil {
        tittel?: string;
        feilmelding: string;
    }

    export interface InputProps extends React.HTMLProps<HTMLInputElement> {
        bredde?: InputBredde;
        className?: string;
        inputClassName?: string;
        feil?: Feil;
        id?: string;
        inputRef?: Function;
        label: string;
        name?: string;
    }

    interface CheckboxProps extends React.HTMLProps<HTMLInputElement> {
        label: React.ReactNode | string | any;
        className?: string;
        id?: string;
        checked?: boolean;
        feil?: Feil;
        checboxRef?: Function;
        value?: string;
        defaultChecked?: boolean;
    }

    interface SkjemagruppeProps {
        title: string;
        children: React.ReactNode | React.ReactNode[];
        className?: string;
        feil?: Feil;
    }

    export interface TextareaProps extends React.HTMLProps<Textarea> {
        label: React.ReactNode | any;
        value?: string;
        maxLength?: number;
        textareaClass?: string;
        id?: string;
        name?: string;
        feil?: Feil;
        tellerTekst?: Function;
        textareaRef?: Function;
    }

    interface SelectProps extends React.HTMLProps<Select> {
        label: React.ReactNode | any;
        bredde?: SelectBredde;
        id?: string;
        className?: string;
        feil?: Feil;
        selectRef?: () => React.ReactElement<any>;
    }

    interface FeilProps {
        feilmelding: React.ReactNode | React.ReactChild | React.ReactChildren;
    }

    interface RadioPanelGruppeProps {
        radios: RadioProps[];
        name: string;
        legend: string;
        onChange: (event: React.SyntheticEvent<EventTarget>, value: string) => void;
        checked?: string;
        feil?: FeilProps;
    }

    interface RadioPanelProps extends RadioProps {
        checked: boolean;
        name: string;
        onChange: (event: React.SyntheticEvent<EventTarget>) => void;
        inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    }

    interface RadioPanelState {
        hasFocus: boolean;
    }

    export class Radio extends React.Component<RadioProps, {}> {}
    export class Checkbox extends React.Component<CheckboxProps, {}> {}
    export class Input extends React.Component<InputProps, {}> {}
    export class SkjemaGruppe extends React.Component<SkjemagruppeProps, {}> {}
    export class Textarea extends React.Component<TextareaProps, {}> {}
    export class Select extends React.Component<SelectProps, {}> {}
    export class RadioPanel extends React.Component<RadioPanelProps, RadioPanelState> {}
    export class RadioPanelGruppe extends React.Component<RadioPanelGruppeProps> {}

}
