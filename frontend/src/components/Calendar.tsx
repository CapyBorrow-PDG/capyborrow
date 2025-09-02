import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Calendar(props) {
	const [dateRange, setDateRange] = useState("");
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	const onChange = (date) => {
		const [start, end] = date;
		setStartDate(start);
		setEndDate(end);
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

	const today = new Date();
	const availableDates = props.disponibility.map(date => new Date(date));
	const filteredDates = availableDates.filter(date => date >= today);

	return (
		<div>
			<DatePicker includeDates={filteredDates} selected={startDate} onChange={onChange} startDate={startDate} endDate={endDate} selectsRange inline />
			<p>{dateRange}</p>
		</div>
	);
}

export default Calendar;
