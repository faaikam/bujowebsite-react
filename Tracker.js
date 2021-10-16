import React from 'react';
import TrackerDate from './tracker/tracker_date';
import CreateTracker from './tracker/create_tracker';
import CreateRatingTracker from './tracker/create_tracker_rating';


function Tracker() {
  return (<div>
    
    <TrackerDate/>
    <CreateTracker/>
    <CreateRatingTracker/>

  </div>)
}




export default Tracker