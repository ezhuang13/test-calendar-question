import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import moment, { MomentInput } from "moment";
import React, { FC, useState } from "react";
import { DayPickerRangeController, isInclusivelyBeforeDay } from "react-dates";

export interface DateRange {
  startDate: moment.Moment | null | undefined;
  endDate: moment.Moment | null | undefined;
}

const START_DATE = "startDate";
const END_DATE = "endDate";
type FocusedInput = "startDate" | "endDate";

type ComparatorOp = ">" | "<" | "==" | ">=" | "<=";

const Calendar: FC = ({}) => {
  // ------- Used for implementation. Can probably ignore these -------
  const [focusedInput, setFocusedInput] = useState<FocusedInput>(START_DATE);
  const handleDatesChange = (newDateRange: DateRange) => {
    const { startDate: newStartDate, endDate: newEndDate } = newDateRange;
    setStartDate(newStartDate?.toDate());
    setEndDate(newEndDate?.toDate());
  };
  const handleFocusChange = (newFocusedInput: FocusedInput) => {
    if (newFocusedInput === END_DATE) setEndDate(null);
    setFocusedInput(newFocusedInput || START_DATE);
  };
  const isOutsideRange = (day: moment.Moment) =>
    isInclusivelyBeforeDay(day, moment().subtract(1, "days"));

  // ------- Some helpful functions and variables -------
  const campsiteReservedDays = ["2022-07-30"]; // Modify as needed for testing
  const [startDate, setStartDate] = useState<Date | undefined | null>();
  const [endDate, setEndDate] = useState<Date | undefined | null>();
  const compareDates = (
    date1: MomentInput,
    date2: MomentInput,
    comparator: ComparatorOp
  ) => {
    switch (comparator) {
      case ">":
        return moment(date1).isAfter(date2, "day");
      case "<":
        return moment(date1).isBefore(date2, "day");
      case "==":
        return moment(date1).isSame(date2, "day");
      case ">=":
        return moment(date1).isSameOrAfter(date2, "day");
      case "<=":
        return moment(date1).isSameOrBefore(date2, "day");
    }
  };

  // ------- TODO: implement this function -------
  const isDayBlocked = (calendarDay: moment.Moment) => {
    // ------- Example solution -------
    if (endDate && compareDates(calendarDay, endDate, "==")) return false;

    return campsiteReservedDays.some((reservedDay) => {
      const isCheckOutDay =
        startDate &&
        !endDate &&
        compareDates(moment(reservedDay), startDate, ">");
      if (isCheckOutDay) {
        const dayBefore = calendarDay.clone().subtract(1, "day");
        return compareDates(dayBefore, reservedDay, ">=");
      }
      return compareDates(calendarDay, reservedDay, "==");
    });
  };

  return (
    <>
      <DayPickerRangeController
        verticalHeight={200}
        hideKeyboardShortcutsPanel={true}
        numberOfMonths={2}
        startDate={startDate ? moment(startDate) : null}
        endDate={endDate ? moment(endDate) : null}
        orientation={"horizontal"}
        isOutsideRange={isOutsideRange}
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={handleFocusChange}
        isDayBlocked={isDayBlocked}
      />
    </>
  );
};

export default Calendar;
