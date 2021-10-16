import React from 'react';
import daysInMonth from '../tracker/days_in_month'
import './tracker.css'
import { v4 as uuidv4 } from 'uuid';

const thisMonth = new Date().getMonth()
const month = daysInMonth[thisMonth].month
const days = daysInMonth[thisMonth].days

const TrackerDate = () => {

    let createDate = []
    
    for (let i = 1; i <= days; i ++ ){
        createDate.push(<div className="date badge bg-secondary" key={uuidv4()}>{i}</div>)
    }

    return(<div className={`${days === 31 ? 'date-sticky-31' : days === 30 ? 'date-sticky-30' : 'date-sticky-28'}`}>

        <h2 className="month fw-bolder">{month}</h2>
        <div className={`${days === 31 ? 'date-container-31' : days === 30 ? 'date-container-30' : 'date-container-28'}`}>{createDate}</div>

    </div>)
}

export default TrackerDate