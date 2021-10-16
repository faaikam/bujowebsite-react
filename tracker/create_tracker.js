import React, {useEffect, useState} from 'react';
import './tracker.css'
import { v4 as uuidv4 } from 'uuid';
import daysInMonth from './days_in_month'
import defaultData31 from './tracker_default_data_31';
import defaultData30 from './tracker_default_data_30';
import defaultData28 from './tracker_default_data_28';


const thisMonth = new Date().getMonth()
const month = daysInMonth[thisMonth].month
const days = daysInMonth[thisMonth].days

let defaultData
    if (days === 31) {
        defaultData = defaultData31
    }
    else if (days === 30) {
        defaultData = defaultData30
    }
    else {
        defaultData = defaultData28
    }

const getLocalStorage = () => {
    let createTracker = localStorage.getItem("createTracker")
    if(createTracker === null) {
        return (createTracker = defaultData)
    }
    else {
        return (createTracker = JSON.parse(localStorage.getItem("createTracker")))
    }
}

const CreateTracker = () => {
    
    const [createTracker, setCreateTracker] = useState(getLocalStorage())
    const [title, setTitle] = useState("")
    
    const newTitle31 = ["title","id",false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    const newTitle30 = ["title","id",false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    const newTitle28 = ["title","id",false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
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
            
            const updatedState = createTracker.slice(0,createTracker.length)
            updatedState.push(updatedTitle)
        
            setCreateTracker(updatedState)
            setTitle("")
        }
    }

    const handleDelete = (index) => {
        const updatedState = createTracker.slice(0,createTracker.length)
        updatedState.splice(index,1)
        setCreateTracker(updatedState) 
    }

    const handleCheckbox = (indexTitle,indexCheckbox) => { 
        let setValue = createTracker[indexTitle][indexCheckbox+2]
        let newValue = !setValue
        setValue = newValue

        const updatedState = createTracker.slice(0,createTracker.length)
        updatedState[indexTitle].splice(indexCheckbox+2,1,setValue)
        setCreateTracker(updatedState) 
    }

    useEffect(() => {
        localStorage.setItem("createTracker", JSON.stringify(createTracker))
    },[createTracker])
    
    return (<section>   

        <h4 className="header-tracker fw-bold text-uppercase">Daily Tracker</h4>
        <form onSubmit={handleSubmit}>
            <input 
                className="form-input"
                type="text" 
                placeholder="Add new title" 
                maxlength="15"
                value={title} 
                onChange={(e) => setTitle(e.target.value)}/>
            <button type="submit" className="add-btn btn btn-outline-secondary btn-sm">Add</button>
        </form>

        {createTracker.map((item,indexTitle) => {
            return (<section>
                <button  
                    type="button" 
                    onClick={() => handleDelete(indexTitle)}
                    className="item-container btn-del-tracker fw-bold"
                    >x
                </button>
                <h6 key={item[1]} className="item-container title-tracker fw-bold">{item[0]}</h6>
                <div className={`${days === 31 ? 'item-container-checkbox date-container-31' : days === 30 ? 'item-container-checkbox date-container-30' : 'item-container-checkbox date-container-28'}`}>
                    {Array.isArray(createTracker[indexTitle]) && 
                        createTracker[indexTitle].filter((item) => typeof(item) !== "string").map((item,indexCheckbox) => {
                            return(<div className="checkbox-container">
                                <label> 
                                    <input 
                                        type="checkbox" 
                                        checked={createTracker[indexTitle][indexCheckbox+2]}
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

export default CreateTracker