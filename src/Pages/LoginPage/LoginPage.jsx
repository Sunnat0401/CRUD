import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginPage.css'
const LoginPage = () => {
  const [raqam, setRaqam] = useState('')
  const [parol, setParol] = useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem('accesstoken')
  useEffect(()=>{
        if(token) {
          navigate('/home')
        }else{
          navigate('/')
        }
  }, [])
  // console.log(raqam , parol);
  const handleSubmit = (e) =>{
    e.preventDefault()
    fetch('https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin', {
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
          console.log(data?.data?.tokens?.accessToken?.token);
          if(data?.success == true){
            toast.success(data?.message)
            localStorage.setItem( "accesstoken" , data?.data?.tokens?.accessToken?.token)
            navigate('/home')
          }else{
            toast.error(data?.message)
            navigate('/')
          }
       })
       .catch((err) => {
          console.log(err.message);
       });
  }
  return (
    <div className="LoginPage">
      <div className="container">
    <form className='loginPage-form'>
      <input type="text" onChange={(e) =>setRaqam(e?.target?.value)} placeholder='Raqam kiriting ...'/>
      <input type="text" onChange={(e) =>setParol(e?.target?.value)} placeholder='parol kiriting...'/>
      <button onClick={handleSubmit}>Login qilish </button>


    </form>
      </div>
    </div>
  )
}

export default LoginPage