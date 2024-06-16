import React, { useEffect, useState } from 'react'
import './Home.css'
import { Modal } from 'antd'
const Home = () => {

    const imgUrl = 'https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/'
    const [exam , setExam] = useState([])
  const [addOpen , setAddOpen] = useState(false)


    useEffect(()=>{
    getInfo()
    },[])
    // GET so'rov uchun
    const getInfo = () =>{
        fetch('https://autoapi.dezinfeksiyatashkent.uz/api/categories')
          .then((response) => {
            if (!response.ok) {
              throw new Error('Xato so\'rov yuborildi');
            }
            return response.json();
          })
          .then((data) => {
            console.log(data?.data);
            setExam(data?.data);
            // setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            // setError(error.message);
            // setLoading(false);
          });

    }
    // GET so'rov uchun
//   Post uchun 
const opoenAddModal=()=>{
    setAddOpen(true)

}
const closeAddModal =()=>{
    setAddOpen(false)

}

}
  return (
    <div>
            <button className='add-btn'>Add</button>
            <Modal title="Basic Modal" open={opoenAddModal} onOk={handleOk} onCancel={closeAddModal}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      {/* PUTso';rov uchun  */}
    {/* GET so'rov uchun */}
        <div className='wrapper'>
            {exam && exam.map((item, index) =>(
               <div className='card' key={index}>
                <img className='wrapper-imgs' src={`${imgUrl}${item?.image_src}`} alt={item?.image_src} />
                 <h1 className='wrapper-title'>{item?.name_en}</h1>
                <h2 className='wrapper-subtitle'>{item?.name_ru}</h2>
                <div className="btn-group">
                    <button>delete</button>
                    <button>edite</button>
                </div>
               </div>
            ))}
            </div> 
         {/* GET so'rov uchun */}
    </div>
  )
}

export default Home
