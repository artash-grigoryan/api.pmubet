import React from 'react';
import omit from 'lodash/omit';
import moment from 'moment';

import 'react-dates/initialize';
import { DayPickerRangeController, isInclusivelyAfterDay } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const defaultProps = {
    // example props for the demo
    autoFocusEndDate: false,
    initialStartDate: null,
    initialEndDate: null,
    startDateOffset: undefined,
    endDateOffset: undefined,

    // day presentation and interaction related props
    renderCalendarDay: undefined,
    renderDayContents: null,
    minimumNights: 1,
    isDayBlocked: () => false,
    isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
    isDayHighlighted: () => false,
    enableOutsideDays: true,

    // calendar presentation and interaction related props
    orientation: "horizontal",
    withPortal: false,
    initialVisibleMonth: null,
    numberOfMonths: 2,
    onOutsideClick() {},
    keepOpenOnDateSelect: false,
    renderCalendarInfo: null,
    isRTL: false,

    // navigation related props
    navPrev: null,
    navNext: null,
    onPrevMonthClick() {},
    onNextMonthClick() {},

    // internationalization
    monthFormat: 'MMMM YYYY',
};

class DayPickerRangeControllerWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            focusedInput: props.autoFocusEndDate ? "endDate" : "startDate",
            startDate: props.initialStartDate,
            endDate: props.initialEndDate,
        };

        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
        this.onStateChange = props.onStateChange;
    }

    onDatesChange({ startDate, endDate }) {
        this.setState({ startDate, endDate });
        this.onStateChange({ startDate, endDate });
    }

    onFocusChange(focusedInput) {
        this.setState({
            // Force the focusedInput to always be truthy so that dates are always selectable
            focusedInput: !focusedInput ? "startDate" : focusedInput,
        });

    }

    render() {
        const { showInputs } = this.props;
        const { focusedInput, startDate, endDate } = this.state;

        const props = omit(this.props, [
            'autoFocus',
            'onStateChange',
            'autoFocusEndDate',
            'initialStartDate',
            'initialEndDate',
        ]);

        const startDateString = startDate && startDate.format('YYYY-MM-DD');
        const endDateString = endDate && endDate.format('YYYY-MM-DD');

        return (
            <div className="day-picker-wrap">
                {showInputs &&
                <div style={{ marginBottom: 16 }}>
                    <div class="input-group">
                        <input type="text" value={startDateString} className="form-control" id="validationDefaultUsername" required/>
                    </div>
                    <input type="text" name="end date" value={endDateString} readOnly />
                </div>
                }

                <DayPickerRangeController
                    {...props}
                    daySize={30}
                    onDatesChange={this.onDatesChange}
                    onFocusChange={this.onFocusChange}
                    focusedInput={focusedInput}
                    startDate={startDate}
                    endDate={endDate}
                />
            </div>
        );
    }
}

DayPickerRangeControllerWrapper.defaultProps = defaultProps;

export default DayPickerRangeControllerWrapper;