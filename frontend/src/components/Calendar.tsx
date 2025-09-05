import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Calendar(props) {
	const [dateRange, setDateRange] = useState("");
	const [startDate, setStartDate] = useState<Date>();
	const [endDate, setEndDate] = useState<Date>();
  const [takenDates, setTakenDates] = useState<string[][]>([])

	const onChange = (date) => {
		const [start, end] = date;
		setStartDate(start);
		setEndDate(end);
    props.onChange([start ? start.toLocaleDateString('en-CA') : start, end ? end.toLocaleDateString('en-CA') : end]);
	};

	useEffect(() => {
		if (startDate && endDate) {
			setDateRange(`From ${startDate.toDateString()} to ${endDate.toDateString()}`);
		} else if (startDate) {
			setDateRange(`From ${startDate.toDateString()}`);
		} else {
			setDateRange("");
		}

    const getBorrows = async () => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/borrows/item/${props.item_id}`)
      .then(res => res.json())
      .then(data => {
        let unavDates: string[][] = [];
        data.map(el => unavDates.push([el.start_date, el.end_date]));
        setTakenDates(unavDates);
      }).catch(err => console.log(err));
    }

    if(props.item_id) getBorrows();

	}, [startDate, endDate, props.item_id]);

	const filterDates = (date) => {

    if(date < new Date()){
      return false;
    }


    if(takenDates) {
      var available = true;
      takenDates.forEach((el) => {

        if(date >= new Date(el[0]) && date <= new Date(el[1])) {
          available = false;
        } //décalé de 1 en arrière
      })
      
      if(!available) {
        return false;
      }
    }

    if(props.disponibility[0] === '1970-01-01' || props.disponibility[1] === '1970-01-01') {
      return true;
    }
    else if(date < new Date(props.disponibility[0]) || date > new Date(props.disponibility[1])) {
      return false;
    } else {
      return true;
    }
  }

	return (
		<div>
			<DatePicker filterDate={filterDates} selected={startDate} onChange={onChange} startDate={startDate} endDate={endDate} selectsRange inline />
			<p>{dateRange}</p>
		</div>
	);
}

export default Calendar;
