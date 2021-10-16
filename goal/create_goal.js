import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './goal.css'

const getLocalStorageGoal = () => {
    let goal = localStorage.getItem("goal")
    if(goal === null) {
        return (goal = ["learn C++", "go surfing"])
    }
    else {
        return (goal = JSON.parse(localStorage.getItem("goal")))
    }
}

const getLocalStorageAchieve = () => {
    let achieve = localStorage.getItem("achieve")
    if(achieve === null) {
        return (achieve = ["HSK2", "N4"])
    }
    else {
        return (achieve = JSON.parse(localStorage.getItem("achieve")))
    }
}

const CreateGoal = () => {

    const [goal, setGoal] = useState(getLocalStorageGoal())
    const [achieve, setAchieve] = useState(getLocalStorageAchieve())
    const [title, setTitle] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title) {
            alert("Please fill goal")
        }
        else {  
            setGoal([...goal, title])
            setTitle("")
        }
    }

    const handleAchieve = (goalIndex) => {
        let moveGoal = goal[goalIndex]
        setGoal(goal.filter((item,index) => index !== goalIndex))
        setAchieve([moveGoal,...achieve])
    }

    const handleDeleteGoal = (deleteIndex) => {
        setGoal(goal.filter((item,index) => index !== deleteIndex))
    }

    const handleDeleteAchieve = (deleteIndex) => {
        setAchieve(achieve.filter((item,index) => index !== deleteIndex))
    }

    useEffect(() => {
        localStorage.setItem("goal", JSON.stringify(goal))
    },[goal])

    useEffect(() => {
        localStorage.setItem("achieve", JSON.stringify(achieve))
    },[achieve])

    return(<section>
        <h2 className="text-uppercase fw-bold header-goal">Setup your goals</h2>

        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                className="form-input"
                placeholder="Write your goal" 
                maxLength="25"
                value={title} 
                onChange={(e) => setTitle(e.target.value)}/>
            <button className="add-btn btn btn-outline-secondary btn-sm">Add</button>
        </form>

        <div className="goal-container">
            
            <div className="section">
                <div className="desc fw-bold">Goals</div>
                {goal.map((item,index) => {
                    return(<div key={uuidv4()} className="goal">
                        <button 
                            className="del-btn btn btn-sm"
                            type="button" 
                            onClick={() => handleDeleteGoal(index)}>x</button>
                        <h4>{item}</h4>
                        <button 
                            className="achieve-btn btn btn-sm"
                            type="button" 
                            onClick={() => handleAchieve(index)}>Achieve!</button>
                    </div>)
                })}
            </div>

            <div className="section">
                <div className="desc fw-bold">Achieved!</div>
                {achieve.map((item,index) => {
                    return(<div key={uuidv4()} className="goal">
                        <button 
                            className="del-btn btn btn-sm"
                            type="button" 
                            onClick={() => handleDeleteAchieve(index)}>x</button>
                        <h4>{item}</h4>
                    </div>)
                })}
            </div>
        </div>
    </section>)
}

export default CreateGoal
