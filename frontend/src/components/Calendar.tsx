import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Calendar(props) {
	const [dateRange, setDateRange] = useState("");
	const [startDate, setStartDate] = useState<Date>();
	const [endDate, setEndDate] = useState<Date>();

	const onChange = (date) => {
		const [start, end] = date;
		setStartDate(start);
		setEndDate(end);
    props.onChange([start, end]);
	};

	useEffect(() => {
		if (startDate && endDate) {
			setDateRange(`From ${startDate.toDateString()} to ${endDate.toDateString()}`);
		} else if (startDate) {
			setDateRange(`From ${startDate.toDateString()}`);
		} else {
			setDateRange("");
		}
	}, [startDate, endDate]);

	/* const filterDates = (date) => {
    if(date < new Date() || date < new Date(props.disponibility[0]) || date > new Date(props.disponibility[1])) {
      return false;
    } else {
      return true;
    }
  } */

	return (
		<div>
			<DatePicker selected={startDate} onChange={onChange} startDate={startDate} endDate={endDate} selectsRange inline />
			<p>{dateRange}</p>
		</div>
	);
}

export default Calendar;
