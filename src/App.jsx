import React, { useState } from 'react'

const App = () => {
  const [raqam, setRaqam] = useState('')
  const [parol, setParol] = useState('')
  console.log(raqam , parol);
  const handleSubmit = (e) =>{
    e.preventDefault()
    fetch('https://autoapi.dezinfeksiyatashkent.uz/api/categories', {
      method: 'POST',
      body: JSON.stringify({
        phone_number : raqam,
        password : parol
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
       .then((response) => response.json())
       .then((data) => {
          console.log(data);
          // Handle data
       })
       .catch((err) => {
          console.log(err.message);
       });
  }
  return (
    <div>
      <input type="text" onChange={(e) =>setRaqam(e?.target?.value)} />
      <input type="text" onchange={(e)=>setParol(e?.target?.value)}/>
      <button onClick={handleSubmit}>yubor</button>
    </div>
  )
}

export default App