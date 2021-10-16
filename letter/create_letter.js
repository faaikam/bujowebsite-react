import React, { useState , useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './letter.css'

const getLocalStorage = () => {
    let letter = localStorage.getItem("letter")
    if(letter === null) {
        return (letter = [{id:"id1",title:"manual", text:"Write letter to future you. Hit read button to read your own letter when due time arrived.", due:"2021-09-01", from:"2021-09-01"}])
    }
    else {
        return (letter = JSON.parse(localStorage.getItem("letter")))
    }
}

const CreateLetter = () => {

    const [letter, setLetter] = useState(getLocalStorage())
    const [title, settitle] = useState("")
    const [text, setText] = useState("")
    const [due, setDue] = useState("")

    const [showTitle, setShowTitle] = useState("")
    const [showFrom, setShowFrom] = useState("")
    const [showDue, setShowDue] = useState("")
    const [showText, setShowText] = useState("")

    //check min due date = today
    let today = new Date()
    let day = today.getDate()
    let month = today.getMonth() + 1
    let year = today.getFullYear()
    if (day < 10) {
        day = "0" + day
    }
    if (month < 10) {
        month = "0" + month
    }
    today = year + "-" + month + "-" + day
  
    const handleSubmit = (e) => {
        e.preventDefault()  
        if (!title || !text || !due) {
            alert("Please write letter and select date due")
        }
        else {
            const newLetter = {id: uuidv4(), title:title, text: text, due: due, from: today}
            setLetter([newLetter, ...letter])
            settitle("")
            setText("")
            setDue("")
        }
    }

    const countNoti = () => {
        let notiNum 
        notiNum = letter.filter((item) => item.due === today).length
        return notiNum
    }
    
    const handleShow = (title, text, due, from) => {
        if(due <= today) {
            setShowTitle(title)
            setShowFrom(from)
            setShowDue(due)
            setShowText(text)
        }
        if(due > today) {
            alert("Please wait ! your letter is on the way")
        }
    }

    useEffect(() => {
        localStorage.setItem("letter", JSON.stringify(letter))
    },[letter])
 
    return(<section>
        
        <div className="letter-box">
            <h2 className="read">read your letter .....</h2>
            <hr/>
            <h4 className="fw-bold read">Title: {showTitle}</h4>
            <h6 className="read"><em>From: {showFrom}</em></h6>
            <h6 className="read"><em>To: {showDue}</em></h6>
            <h6 className="fw-bold read">{showText}</h6>
        </div>

        <h2 className="text-uppercase fw-bold header-letter">write letter to future you</h2>
        {countNoti() > 0 && (<h3 className="noti"><em>You have {countNoti()} letters for today! Let's find out!</em></h3>)}
        
        <form onSubmit={handleSubmit} className="letter-container">
            <h4 className="letter-center fw-bold">Letter</h4>
            
            <div className="letter-center">
                <input 
                    type="text" 
                    style={{width:"500px"}}
                    placeholder="Write your title" 
                    value={title} 
                    maxLength="30"
                    onChange={(e) => settitle(e.target.value)}/>
            </div>

            <div className="letter-center">
                <textarea 
                    cols="80" rows="10" 
                    placeholder="Write your letter" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)}>
                </textarea>
            </div>

            <h5 className="letter-center fw-bold">time you will recieve your letter</h5>

            <div className="letter-center">
                <input  
                    type="date" 
                    min={today} 
                    value={due} 
                    onChange={(e) => setDue(e.target.value)}/>
            </div>

            <div className="letter-center">
                <button type="submit" className="add-btn btn btn-secondary btn-sm">Send</button>
            </div>
        </form>        

        <div className="letter-desc-container">
            <h4 className="letter-desc fw-bold text-uppercase">mailbox</h4>
            <h5 className="letter-desc"><em>All letters gathered here</em></h5>
            <h6 className="letter-desc"><em>click read to review, then letter will be shown in right side</em></h6>
            <h6 className="letter-desc"><em>still cannot read letter in grey box since it's not arrived yet!</em></h6>
        </div>

        <div>
            {letter.map((item) => {
                const {id, title, text, due, from} = item
                return(<div key={id} className={`${due <= today ? 'show' : 'unshow'}`}>
                    <button 
                        className="read-btn btn btn-outline-secondary btn-sm"
                        type="button" 
                        onClick={() => handleShow(title, text, due, from)}>read</button>
                    <span className="fw-bold list">{title}</span>
                    <span className="list">from: {from}</span>
                    <span className={`${due === today ? 'today list' : 'list'}`}>to: {due}</span>
                </div>)      
            })}
        </div>

    </section>)
}

export default CreateLetter