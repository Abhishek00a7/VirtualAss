import React, { createContext, useState } from 'react';
import run from '..';

export const datacontext = createContext();

function UserContext({ children }) {
  const [first, setfirst] = useState(false);
  const [res, setres] = useState("Listening....");
  const [pro, setpro] = useState(false);
  const [showButton, setShowButton] = useState(false); // ✅ Added state for button visibility

  function speak(text, callback) {
    let text_speech = new SpeechSynthesisUtterance(text);
    text_speech.volume = 1;
    text_speech.pitch = 1;
    text_speech.rate = 1;
    text_speech.lang = "hi-US";

    text_speech.onend = () => {
      console.log("Speech ended");
      setShowButton(true); // ✅ Show button after speech ends
      if (callback) callback();
    };

    window.speechSynthesis.speak(text_speech);
  }

  async function aiResponse(prompt) {
    setShowButton(false); // ✅ Hide button while response is coming
    let text = await run(prompt);
    let new_text = text.split("Google") && text.replace("Google","Abhishek") &&text.replace("Google","Abhishek")
    let anotext = new_text.split("**") && new_text.split("*");

    speak(anotext, () => {
      setfirst(false);
    });

    setres(anotext);
  }

  let speechrecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new speechrecognition();

  recognition.onresult = (e) => {
    let currentIndex = e.resultIndex;
    let transcript = e.results[currentIndex][0].transcript;
    setres(transcript);
    takecommand(transcript.toLowerCase());
  };

  function takecommand(command) {
    setShowButton(false);

    if (command.includes("open") && command.includes("youtube")) {
      window.open("https://www.youtube.com", "_blank");
      speak("opening youtube");
      setres("opening youtube...");
      setpro(true);
      setTimeout(()=>{
       setfirst(false)
      },2000)
    } 
    else if (command.includes("open") && command.includes("google")) {
      window.open("https://www.google.com", "_blank");
      speak("opening google");
      setres("opening google...");
      setpro(true);
      setTimeout(()=>{
        setfirst(false)
       },2000)
    } 
    else if (command.includes("open") && command.includes("instagram")) {
      window.open("https://www.instagram.com", "_blank");
      speak("opening instagram");
      setres("opening instagram...");
      setpro(true);
      setTimeout(()=>{
        setfirst(false)
       },2000)
    } 
    else if (command.includes("open") && command.includes("whatsapp")) {
      window.open("https://web.whatsapp.com", "_blank");
      speak("opening whatsapp");
      setres("opening whatsapp...");
      setpro(true);
      setTimeout(()=>{
        setfirst(false)
       },2000)
    } 
    else if (command.includes("open") && command.includes("telegram")) {
      window.open("https://web.telegram.org", "_blank");
      speak("opening telegram");
      setres("opening telegram...");
      setpro(true);
      setTimeout(()=>{
        setfirst(false)
       },2000)
    } 
    else if (command.includes("open") && command.includes("map")) {
      window.open("https://www.google.com/maps", "_blank");
      speak("opening google map");
      setres("opening google map...");
      setpro(true);
      setTimeout(()=>{
        setfirst(false)
       },2000)
    } 
    else if (command.includes("open") && command.includes("mails")) {
      window.open("https://mail.google.com/mail", "_blank");
      speak("opening mails");
      setres("opening mails...");
      setpro(true);
      setTimeout(()=>{
        setfirst(false)
       },2000)
    } 
    else if (command.includes("time")) {
      let time = new Date().toLocaleString(undefined, { hour: "2-digit", minute: "2-digit" });
      speak(time);
      setres(time);
      setpro(true);
      setTimeout(()=>{
        setfirst(false)
       },3000)
    } 
    else if (command.includes("date")) {
      let date = new Date().toLocaleString(undefined, { day: "2-digit", month: "short" , year:"2-digit" });
      speak(date);
      setres(date);
      setpro(true);
      setTimeout(()=>{
        setfirst(false)
       },3000)
    } 
    else {
      aiResponse(command);
    }
  }

  let value = {
    recognition,
    first,
    setfirst,
    res,
    setres,
    pro,
    showButton, // ✅ Added button state to context
  };

  return (
    <datacontext.Provider value={value}>
      {children}
      {/* {showButton && <button onClick={() => recognition.start()}>🎤 Speak Again</button>} ✅ Show button after speech ends */}
    </datacontext.Provider>
  );
}

export default UserContext;
