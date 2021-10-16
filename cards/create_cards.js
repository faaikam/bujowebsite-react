import React, {useState, useRef, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import defaultTitle from './cards_default_data';
import './cards.css'

const getLocalStorage = () => {
    let cards = localStorage.getItem("cards")
    if(cards === null) {
        return (cards = defaultTitle)
    }
    else {
        return (cards = JSON.parse(localStorage.getItem("cards")))
    }
}

const CreateCards = () => {

    const [cards, setCards] = useState(getLocalStorage())
    const [title, setTitle] = useState("")
    
    let refsTitleId = useRef({})
    let refsText = useRef({})

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!title) {
            alert("Please fill new card")
        }
        else {
            const newTitle = {title: title, id: uuidv4(), list:[]}
            setCards([...cards, newTitle])
            setTitle("")
        }
    }

    const handleDeleteCard = (id) => {
        setCards(cards.filter((item) => item.id !== id))
    }

    const handleSubmitList = (index) => {
        let listTitleId = refsTitleId.current[index].innerHTML
        let listText = refsText.current[index].value
        //useRef to target input of each list
        //console.log(refsTitleId.current[index].innerHTML)
        //console.log(refsText.current[index].value)
       
        if (!listText) {
            alert("Please fill text")
        }
        else {
            let newLists
            cards.filter((card,index) => {
                if (card.id === listTitleId) {
                    newLists = card.list
                    newLists.push(listText) 
                    const updatedCard = {...card, list:newLists}
                    const updatedState = cards.slice(0,cards.length)
                    updatedState.splice(index,1,updatedCard)
                    setCards(updatedState)
                    document.getElementById("clearfield"+(index.toString())).reset()
                } 
            })
        }
    }

    const handelDeleteList = (cardIndex,listIndex) => {
        let newLists
        cards.filter((card,index) => {
            if (index === cardIndex) {
                newLists = card.list
                newLists.splice(listIndex,1)
                const updatedCard = {...card, list:newLists}
                const updatedState = cards.slice(0,cards.length)
                updatedState.splice(index,1,updatedCard)
                setCards(updatedState)
            }
        })
    }

    useEffect(() => {
        localStorage.setItem("cards", JSON.stringify(cards))
    },[cards])

    return(<section>

        <h2 className="text-uppercase fw-bold header-cards">Organize your mind</h2>

        <form onSubmit={handleSubmit}>
            <input 
                className="form-input"
                type="text" 
                placeholder="Add new card" 
                maxLength="15"
                value={title} 
                onChange={(e) => setTitle(e.target.value)}/>
            <button type="submit" className="add-btn btn btn-outline-secondary btn-sm">Add</button>
        </form>

        {cards.map((item,index) => {
            const {title, id, list} = item
            return(<div key={id} className="card-container">
                
                <div className="list-container">
                    <button 
                        className="del-card-btn float-end"
                        onClick={() => handleDeleteCard(id)}>x</button>
                    <h2 className="card-title fw-bold">{title}</h2>
                </div>
                
                <div className="card-area-container">
                    {list.map((listItem,listIndex) => {
                        return(<div className="list-container" key={`${id}${listIndex}`}>
                            <h5 className="fw-bold list-element">{listItem}</h5>
                            <button 
                                className="del-list-btn list-element float-end"
                                onClick={() => handelDeleteList(index,listIndex)}>x</button>
                        </div>)
                    })}
                </div>
                    
                <aside ref = {(ref) => refsTitleId.current[index] = ref}>{id}</aside>
                <form className="list-input-container" id={`clearfield${index}`} onSubmit={(e) => e.preventDefault()}>       
                    <input 
                        style={{width:"280px"}}
                        ref = {(ref) => refsText.current[index] = ref}
                        type="text"  
                        placeholder="Write memo here"
                        maxLength="20"/>
                    <button className="add-list-btn btn btn-outline-secondary btn-sm" 
                        type="button" 
                        onClick={() => handleSubmitList(index)}>Add</button>
                </form>   
            </div>)
        })}
    </section>)
}

export default CreateCards