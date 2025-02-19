import React, { useContext } from 'react'
import image1 from "./assets/LCPT.gif"
import "./App.css";
import { datacontext } from './contexts/UserContext';
import loader from "./assets/Loading.gif"
import aivoice from "./assets/aiVoice.gif"
import jva from "./assets/JVA.gif"

function App() {
  let {recognition , first , setfirst , res , pro} = useContext(datacontext)
 
  return (
    <div className='main'>
      <h1></h1>
      <img src={jva} className='assistant' alt="Not loading because of network" />
      <h1 className='font-bold'>"Hi there! I’m your AI-powered virtual assistant, skillfully created by Abhishek Sharma</h1>
      {!first?<button onClick={()=>{
          setfirst(true)
          recognition.start()
        }}>Click to Speak</button> 
        : <div id='loading'>
          {!pro?<img src={aivoice} alt="Not loading bro" id='loader' />
          : <img src={aivoice} alt="Not loading bro" id='loader2' />
          }
         {/* <p id='p'>{res}</p> */}
        </div>
        }
        
      
    </div>
  )
}

export default App