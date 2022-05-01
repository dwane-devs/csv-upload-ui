import { useState } from 'react';
import { parse } from "papaparse"
import './App.css';

function App() {

  const [highlighted, setHighlighted] = useState(false)
  const [contacts, setContacts] = useState([{email: "fake@gmail.com", name: "Fake"}])

  return (
    <div className="App">
      <h1>Contact Import</h1>
      <div className={`drop-zone ${highlighted && "highlight"} `}
      onDragEnter={(e)=>{
        setHighlighted(true)

      }}
      onDragLeave={(e)=>{
        setHighlighted(false)
        
      }}
      onDragOver={(e)=>{
        e.preventDefault()
      }}
      onDrop={(e)=>{
        e.preventDefault()
        setHighlighted(false)
        console.log(e.dataTransfer.files)
        Array.from(e.dataTransfer.files)
        .filter((file) => file.type === "text/csv" )
        .forEach( async (file) => { 
          // console.log(file)
          const text = await file.text();
          // console.log(text)
          const result = parse(text, {header: true} )
          console.log(result.data)
          setContacts(existing => [...existing, ...result.data])
        })
      }}
      > DROP HERE</div>
  
  <ul>
    {contacts.map(((contact)=>(
      <li key={contact.email}>{contact.name}</li>
    )))}
      
    </ul>
    </div>
  
  );
}

export default App;
