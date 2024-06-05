import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

import './HomePages.css'
import { toast } from 'react-toastify';
import { DeleteOutlined, EditOutlined, FolderAddOutlined } from '@ant-design/icons';
import axios from 'axios';
import { message, Modal } from 'antd';
const HomePages = () => { 
  // get api table 
  const [info, setInfo] = useState([])
  const getInfo=() =>{
    fetch('https://autoapi.dezinfeksiyatashkent.uz/api/categories')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setInfo(data?.data)
    });
  }
  useEffect(() => {
   getInfo()
  }, []);
// post  api modal 
const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [nameEn, setNameEn] = useState()
  const [nameRu, setNameRu] = useState()
  const [picture, setPicture] = useState()
  const token = localStorage.getItem('accesstoken')
  const formData = new FormData();
  formData.append("name_en" , nameEn);
  formData.append("name_ru" , nameRu);
  formData.append("images" , picture);
  const InfoCreate = (e) =>{
    e.preventDefault()
    fetch('https://autoapi.dezinfeksiyatashkent.uz/api/categories', {
      method: 'POST',
      body: formData,
      headers: {
        // 'Content-type': 'multipart/form-data',
"Authorization": ` Bearer ${token}`
      },
    })
       .then((response) => response.json())
       .then((data) => {
          console.log(data?.message)
          if(data?.success){
            toast.success(data?.message)
            handleClose()
            getInfo()
          }else{
            toast.error(data?.message)
          }
       })
       .catch((err) => {
          console.log(err?.message);
       });
  }


  // Delete api modal 
  const deleteInfo = (id) =>{
    Modal.confirm({
      title: "Delete Category",
      content: "Are you sure you want to delete this category?",
      maskClosable: true, // Allow closing by clicking outside the modal
      onOk() {
          const headers = {
              Authorization: `Bearer ${token}`,
          }
          axios({
              url: `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`,
              method: 'DELETE',
              headers: headers,
          }).then((res) => {
              console.log(res);
              message.success(`Muvaffaqiyatli o'chirildi !`)
              getInfo()
          }).catch((err) => {
              console.log("Error", err);
          })
      },
      onCancel() {
          console.log('Cancel');
          // onCancel={closeModal}
      },
  });
  }
  return (
    <div className='home'>
      <div className="container">
      <div className="infoCreate">
      <div >
      <Button onClick={handleOpen}>Element Qoshish</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form className='post-form'>
             <input type="text " required placeholder="name_en" onChange={(e) =>setNameEn(e?.target?.value)}/>
             <input type="text " required placeholder="name_ru" onChange={(e)=>setNameRu(e?.target?.value)}/>
             <input className='post-file' type="file" accept='image/*' required  onChange={(e)=>setPicture(e?.target?.files[0])}/>
             <button type="submit" onClick={InfoCreate}>Qo'shish</button>
        </form>
        </Box>
      </Modal>
    </div>
      </div>
        <table>
          <thead>
            <tr>
              <th>
                Inglizcha 
              </th>
              <th>
                ruscha  
              </th>
              <th>
                rasmlar 
              </th>
            </tr>
          </thead>
          <tbody>
            {info?.map((item, index) =>(
              <tr key={index}>
              <td>{item?.name_en}</td>
              <td>{item?.name_ru}</td>
              <td> <img src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item?.image_src}`} alt="" /><DeleteOutlined onClick={()=>deleteInfo(item?.id)}  className='outlined'/><EditOutlined className='editoutlined' /></td>
            </tr>
            ))}
          
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HomePages