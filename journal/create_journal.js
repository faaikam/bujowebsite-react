import React, {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import defaultList from './journal_data';
import './journal.css'

const getLocalStorage = () => {
    let journal = localStorage.getItem("journal")
    if(journal === null) {
        return (journal = [{id: "journalid1", title:"journal everyday", text:"Write down to clear your mind or get an idea to improve your writing skill.", date:"2021-09-01"}])
    }
    else {
        return (journal = JSON.parse(localStorage.getItem("journal")))
    }
}

const CreateJournal = () => {

    const [journal, setJournal] = useState(getLocalStorage())
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")

    const randomIdea = () => {
        // defaultList = 20 ideas
        let randomNumber = Math.floor(Math.random()*20)
        const randomItem = defaultList[randomNumber]
        document.getElementById("idea").innerHTML = randomItem
        setTitle(randomItem)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let today = new Date()
        let day = today.getDate().toString()
        let month = today.getMonth() + 1 
        month.toString()
        let year = today.getFullYear().toString()
        if (day < 10) {
            day = "0" + day
        }
        if (month < 10) {
            month = "0" + month
        }
        today = year + "-" + month + "-" + day

        if(!title || !text) {
            alert("Please fill title and text")
        }
        else {
            const newJournal = {id: uuidv4(), title:title, text:text, date:today}
            setJournal([newJournal, ...journal])
            setTitle("")
            setText("")
        }
    }

    const handleDelete = (id) => {
        setJournal(journal.filter((item) => item.id !== id))
    }

    const handleEdit = (journalIndex) => {   
        journal.map((item,index) => {
            if (index === journalIndex) {
                let journalEdit = journal[index]
                setTitle(journalEdit.title)
                setText(journalEdit.text)
                journal.splice(index,1)
            }
        })
    }

    useEffect(() => {
        localStorage.setItem("journal", JSON.stringify(journal))
    },[journal])

    return(<section>

        <h2 className="text-uppercase fw-bold journal-header">What is your today's journal</h2>
        
        <form onSubmit={handleSubmit} className="background">
            <div className="center">
                <h4 className="title fw-bold">Title</h4>
                <input 
                    type="text" 
                    placeholder="Write your journal title" 
                    value={title} 
                    className="title"
                    style={{width:"735px"}}
                    onChange={(e) => setTitle(e.target.value)}/>
            </div>

            <div className="center text-area">
                <textarea 
                cols="100" rows="10" 
                placeholder="Write your journal text" 
                value={text} 
                onChange={(e) => setText(e.target.value)}>
                </textarea>
            </div>

            <div className="center">
                <button type="submit" className="create-btn btn btn-secondary btn-sm">Create</button>
            </div>
        </form>

        <div className="center idea-container">
            <div id="idea" className="random badge bg-light text-dark idea-center">Explore new journal ideas</div>
            <button type="button" onClick={randomIdea} className="idea-btn btn btn-outline-secondary btn-sm idea-center">Get idea!</button>
        </div>

        <div className="container"> 
            {journal.map((item,index) => {
                const {id,title,text,date} = item
                return(<div key={id} className="journal">
                    <button 
                        type="button" 
                        className="journal-btn btn btn-sm"
                        onClick={() => handleDelete(id)}>x</button>
                    <button 
                        type="button" 
                        className="journal-btn btn btn-sm"
                        onClick={() => handleEdit(index)}>edit</button>
                    <h4 className="fw-bold">{title}</h4>
                    <h5>{text}</h5>
                    <p><em><small>{date}</small></em></p>
                </div>)
            })}
        </div>  

    </section>)
}

export default CreateJournal