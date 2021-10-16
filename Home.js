import React from 'react';
import './Home.css'


const Home = () => {
    return(<div className="home">
        <h2 className="home-header fw-bold">Welcome to bullet journal online template</h2>
        <h4 className="home-desc">We offer you several ideas to keep your life organized.<br/>Track record will be store in browser memory.</h4>
        
        <h3 className="home-tracker"> <span className="topic fw-bold"> Tracker </span> will help you review your discipline and productivity. <h4>At the end of each month you can refresh template easily by clearing all existing title then add new ones.</h4> </h3>
        
        <h3 className="home-cards"> <span className="topic fw-bold">Cards</span> is an effective organizer. <h4>Group all your lists here, it's easy to review the tasks or even used as short diary.</h4> </h3>
        
        <h3 className="home-journal">Keep <span className="topic fw-bold">Journaling</span> ! <h4>If you have no idea just click 'Get idea!' button.</h4> </h3>
       
        <h3 className="home-goal">Review your <span className="topic fw-bold">Goal</span>. <h4>The achieved side will keep you motivated.</h4> </h3>
        
        <h3 className="home-letter">Write <span className="topic fw-bold">Letter</span> to yourself and let it stored here. <h4>when the time comes you can read what yourself in the past wants to tell you.</h4> </h3>

        <h4 className="home-desc">Enjoy!</h4>
        <hr/>
      

    </div>)
}

export default Home