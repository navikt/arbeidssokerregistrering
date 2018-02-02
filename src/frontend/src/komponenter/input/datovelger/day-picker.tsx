import * as React from 'react';
import * as moment from 'moment';
import { FormattedDate, injectIntl, InjectedIntl, InjectedIntlProps, DateSource } from 'react-intl';
import DayPicker from 'react-day-picker';
import * as DateUtils from 'react-day-picker/lib/src/DateUtils';
import MomentLocaleUtils from 'react-day-picker/moment';
import { erGyldigIsoDato } from './utils';

const localeUtils = {
    ...MomentLocaleUtils,
    formatWeekdayShort: (i, locale) =>
        MomentLocaleUtils.formatWeekdayLong(i, locale).substring(0, 3),
};

interface CaptionProps {
    date?: DateSource;
}

export const Caption = ({date}: CaptionProps) =>
    (
        <div
            className="DayPicker-Caption"
            role="heading"
            aria-live="assertive"
            aria-atomic="true"
        >
            <FormattedDate month="long" year="numeric" value={date || ''}/>

        </div>
    );

interface NavBarProps {
    onNextClick?: () => void;
    onPreviousClick?: () => void;
    showPreviousButton?: boolean;
    showNextButton?: boolean;
    intl: InjectedIntl;
}

export function NavBar({
                           onNextClick,
                           onPreviousClick,
                           showPreviousButton = false,
                           showNextButton = false,
                           intl
                       }: NavBarProps) {
    const className = 'DayPicker-NavButton';
    return (
        <div role="toolbar">
            <button
                tabIndex={0}
                aria-label={intl.formatMessage({
                    id: 'datepicker.forrige-maaned',
                })}
                className={`${className} DayPicker-NavButton--prev`}
                disabled={!showPreviousButton}
                type="button"
                onClick={e => {
                    e.preventDefault();
                    if (onPreviousClick) {
                        onPreviousClick();
                    }
                }}
            />
            <button
                tabIndex={0}
                aria-label={intl.formatMessage({
                    id: 'datepicker.neste-maaned',
                })}
                className={`${className} DayPicker-NavButton--next`}
                disabled={!showNextButton}
                type="button"
                onClick={e => {
                    e.preventDefault();
                    if (onNextClick) {
                        onNextClick();
                    }
                }}
            />
        </div>
    );
}

interface DayPickerComponentProps {
    lukk: () => void;
    ariaControlledBy?: string;
    onKeyUp: (e: React.KeyboardEvent<HTMLElement>) => void;
    input?: { value: string };
    onDayClick: (day: Date) => void;
    ariaControls: string;
}

class DayPickerComponent extends React.Component<DayPickerComponentProps & InjectedIntlProps> {
    lukk: () => void;
    componentDidMount() {
        this.lukk = () => {
            this.props.lukk();
        };

        document.body.click(); // fjern andre datepickere
        document.addEventListener('click', this.lukk);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.lukk);
    }

    getDateFromValue() {
        const { input } = this.props;

        return input && erGyldigIsoDato(input.value) ? moment(input.value).toDate() : null;
    }

    selectedDays(day: Date) {
        return DateUtils.isSameDay(this.getDateFromValue() || new Date(), day);
    }

    render() {
        const {onKeyUp} = this.props;
        return (
            <div
                className="datovelger__DayPicker"
                onKeyUp={e => {
                    onKeyUp(e);
                }}
            >
                <DayPicker
                    locale="no"
                    localeUtils={localeUtils}
                    firstDayOfWeek={1}
                    captionElement={<Caption />}
                    navbarElement={<NavBar intl={this.props.intl}/>}
                    selectedDays={day => this.selectedDays(day)}
                    onDayClick={(date) => this.props.onDayClick(date)}
                    {...this.props}
                />
            </div>
        )
            ;
    }
}

export default injectIntl(DayPickerComponent);
