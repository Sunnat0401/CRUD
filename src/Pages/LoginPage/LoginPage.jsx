import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginPage.css';
import { Form, Input, Button } from 'antd';

const LoginPage = () => {
  const [raqam, setRaqam] = useState('');
  const [parol, setParol] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('accesstoken');

  useEffect(()=>{
        if(token) {
          navigate('/home')
        }else{
          navigate('/')
        }
  }, [])

  const handleSubmit = (values) => {
    fetch('https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify({
        phone_number: raqam,
        password: parol,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data?.data?.tokens?.accessToken?.token);
        if (data?.success === true) {
          toast.success(data?.message);
          localStorage.setItem('accesstoken', data?.data?.tokens?.accessToken?.token);
          navigate('/home');
        } else {
          toast.error(data?.message);
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="LoginPage">
      <div className="container">
        <Form
          onFinish={handleSubmit}
          className="loginPage-form"
          name="login"
          initialValues={{ remember: true }}
          layout="vertical"
        >
          <Form.Item
            label="Telefon raqam"
            name="phone_number"
            rules={[{ required: true, message: 'Iltimos, telefon raqamingizni kiriting!' }]}
          >
            <Input className="input" onChange={(e)=>setRaqam(e?.target?.value)} />
          </Form.Item>

          <Form.Item
            label="Parol"
            name="password"
            rules={[{ required: true, message: 'Iltimos, parolingizni kiriting!' }]}
          >
            <Input.Password className="inputp"  onChange={(e)=>setParol(e?.target?.value)}/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="button">
              Kirish
            </Button>
          </Form.Item>
        </Form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginPage;
