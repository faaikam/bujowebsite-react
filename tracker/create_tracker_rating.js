import React, {useState, useEffect} from 'react';
import './tracker.css'
import { v4 as uuidv4 } from 'uuid';
import daysInMonth from './days_in_month'
import ratingDefaultData31 from './tracker_rating_default_data_31';
import ratingDefaultData30 from './tracker_rating_default_data_30';
import ratingDefaultData28 from './tracker_rating_default_data_28';


const thisMonth = new Date().getMonth()
const month = daysInMonth[thisMonth].month
const days = daysInMonth[thisMonth].days

let ratingDefaultData
    if (days === 31) {
        ratingDefaultData = ratingDefaultData31
    }
    else if (days === 30) {
        ratingDefaultData = ratingDefaultData30
    }
    else {
        ratingDefaultData = ratingDefaultData28
    }

const getLocalStorage = () => {
    let createTrackerRating = localStorage.getItem("createTrackerRating")
    if(createTrackerRating === null) {
        return (createTrackerRating = ratingDefaultData)
    }
    else {
        return (createTrackerRating = JSON.parse(localStorage.getItem("createTrackerRating")))
    }
}

const CreateRatingTracker = () => {

    const [createTrackerRating, setCreateTrackerRating] = useState(getLocalStorage())
    const [title, setTitle] = useState("")

    const newTitle31 = ["title","id",false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    const newTitle30 = ["title","id",false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    const newTitle28 = ["title","id",false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    let newTitleModel
    if (days === 31) {
        newTitleModel = newTitle31
    }
    else if (days === 30) {
        newTitleModel = newTitle30
    }
    else {
        newTitleModel = newTitle28
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!title){   
            alert ("Please fill title")
        }
        else{
            const updatedTitle = newTitleModel.slice(0,newTitleModel.length)
            updatedTitle.splice(0,1,title)
            updatedTitle.splice(1,1,uuidv4())
            
            const updatedState = createTrackerRating.slice(0,createTrackerRating.length)
            updatedState.push(updatedTitle)
        
            setCreateTrackerRating(updatedState)
            setTitle("")
        }
    }

    const handleDelete = (index) => {
        const updatedState = createTrackerRating.slice(0,createTrackerRating.length)
        updatedState.splice(index,1)
        setCreateTrackerRating(updatedState) 
    }

    const handleCheckbox = (indexTitle,indexCheckbox) => { 
        let setValue = createTrackerRating[indexTitle][indexCheckbox+2]
        let newValue = !setValue
        setValue = newValue

        const updatedState = createTrackerRating.slice(0,createTrackerRating.length)
        updatedState[indexTitle].splice(indexCheckbox+2,1,setValue)
        setCreateTrackerRating(updatedState) 
    }

    useEffect(() => {
        localStorage.setItem("createTrackerRating", JSON.stringify(createTrackerRating))
    },[createTrackerRating])

    return (<section>   

        <h4 className="header-ratingtracker fw-bold text-uppercase">Rating Tracker</h4>

        <form onSubmit={handleSubmit}>
            <input 
                className="form-input"
                type="text" 
                placeholder="Add new rating title" 
                maxlength="15"
                value={title} 
                onChange={(e) => setTitle(e.target.value)}/>
            <button type="submit" className="add-btn btn btn-outline-secondary btn-sm">Add</button>
        </form>

        {createTrackerRating.map((item,indexTitle) => {
            return (<section>
                <button  
                    type="button" 
                    onClick={() => handleDelete(indexTitle)}
                    className="item-container btn-del-tracker fw-bold"
                    >x
                </button>
                <h6 key={item[1]} className="item-container title-tracker fw-bold">{item[0]}</h6>
                <div className="rating-container">
                    <h6 className="rating">Great</h6>
                    <h6 className="rating">Good</h6>
                    <h6 className="rating">Normal</h6>
                    <h6 className="rating">Bad</h6>
                    <h6 className="rating">Worst</h6>
                </div>
                <div  className={`${days === 31 ? 'item-container-ratingcheckbox date-container-31' : days === 30 ? 'item-container-ratingcheckbox date-container-30' : 'item-container-ratingcheckbox date-container-28'}`}>
                    {Array.isArray(createTrackerRating[indexTitle]) && 
                        createTrackerRating[indexTitle].filter((item) => typeof(item) !== "string").map((item,indexCheckbox) => {
                            return(<div className="checkbox-container">
                                <label> 
                                    <input 
                                        type="checkbox" 
                                        checked={createTrackerRating[indexTitle][indexCheckbox+2]}
                                        onChange={() => handleCheckbox(indexTitle,indexCheckbox)}/>
                                    <span className="checkmark"></span>
                                </label>
                            </div>) 
                        })
                    }
                </div>
            </section>)
        })}

    </section>)
}

export default CreateRatingTracker