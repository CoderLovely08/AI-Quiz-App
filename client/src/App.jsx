import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/')
      .then(result => result.json())
      .then(data => {
        setMessage(data)
        console.log(data);
      }).catch(error => console.log(error))
  }, []);

  return (
    <>
      <h1>Quiz Application</h1>
      <div>{message.message}</div>
    </>
  )
}

export default App
