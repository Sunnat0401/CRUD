import React, { useEffect, useState } from "react";
import "./HomePages.css";
import { toast } from "react-toastify";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { Button, message, Modal } from "antd";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const HomePages = () => {
  const [openEdit, setOpenEdit] = useState(false);
  // Get API table
  const [info, setInfo] = useState([]);

  const getInfo = () => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setInfo(data?.data);
      });
  };

  useEffect(() => {
    getInfo();
  }, []);

  // Post API modal
  const [open, setOpen] = useState(false);
  const [nameEn, setNameEn] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [picture, setPicture] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const InfoCreate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accesstoken");
    const formData = new FormData();
    formData.append("name_en", nameEn);
    formData.append("name_ru", nameRu);
    formData.append("images", picture);

    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories", {
      method: "POST",
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`,
        // Content-Type ni avtomatik o'rnatiladi
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          toast.success(data?.message);
          handleClose();
          getInfo();
        } else {
          toast.error(data?.message);
        }
      })
      .catch((err) => {
        console.log(err?.message);
      });
  };

  // Delete API modal
  const deleteInfo = (id) => {
    Modal.confirm({
      title: "Delete Category",
      content: "Are you sure you want to delete this category?",
      maskClosable: true, // Allow closing by clicking outside the modal
      onOk() {
        const token = localStorage.getItem("accesstoken");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        axios({
          url: `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`,
          method: "DELETE",
          headers: headers,
        })
          .then((res) => {
            // console.log(res?.data);
            toast.success(res?.data?.message);
            getInfo();
          })
          .catch((err) => {
            console.log("Error", err);
            toast.error(err?.message);
          });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  // create api
  const showEditModal = (item) => {
    console.log(item);
    setOpenEdit(true);
    setNameEn(item?.name_en);
    setNameRu(item?.name_ru);
    setPicture(item?.image_src);
  };
  const closeEditModal = () => {
    setOpenEdit(false);
  };
  const cerateInfo = (e) =>{
    const urlimg = `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${picture}`
    e.preventDefault();
    const token = localStorage.getItem("accesstoken");
    const formData = new FormData();
    formData.append("name_en", nameEn);
    formData.append("name_ru", nameRu);
    formData.append("images", picture);

    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories", {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data?.success) {
          toast.success(data?.message);
          handleClose();
          getInfo();
        } else {
          toast.error(data?.message);
        }
      })
      .catch((err) => {
        console.log(err?.message);
      });
  }
  return (
    <div className="home">
      <div className="container">
        <div className="infoCreate">
          <Button onClick={handleOpen}>Element Qoshish</Button>
          <Modal open={open} onCancel={handleClose} footer={null}>
            <form
              style={{ marginTop: "50px" }}
              className="post-form"
              onSubmit={InfoCreate}
            >
              <input
                type="text"
                required
                placeholder="name_en"
                onChange={(e) => setNameEn(e.target.value)}
              />
              <input
                type="text"
                required
                placeholder="name_ru"
                onChange={(e) => setNameRu(e.target.value)}
              />
              <input
                className="post-file"
                type="file"
                accept="image/*"
                required
                onChange={(e) => setPicture(e.target.files[0])}
              />
              <button type="submit">Qo'shish</button>
            </form>
          </Modal>
        </div>
        <table>
          <thead>
            <tr>
              <th>Inglizcha</th>
              <th>Ruscha</th>
              <th>Rasmlar</th>
            </tr>
          </thead>
          <tbody>
            {info?.map((item, index) => (
              <tr key={index}>
                <td>{item?.name_en}</td>
                <td>{item?.name_ru}</td>
                <td>
                  <img
                    src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item?.image_src}`}
                    alt=""
                  />
                  <DeleteOutlined
                    onClick={() => deleteInfo(item?.id)}
                    className="outlined"
                  />
                  <EditOutlined
                    className="editoutlined"
                    onClick={() => showEditModal(item)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        title="tahrirlash "
        open={openEdit}
        onCancel={closeEditModal}
        footer={null}
      >
        <form>
          <input type="text" value={nameEn} onChange={(e)=>setNameEn(e?.target?.value)} />
          <input type="text" value={nameRu} onChange={(e)=>setNameRu(e?.target?.value)} />
          <div className="img-wrapper">
            <img
              className="edit-img"
              src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${picture}`}
              alt=""
            />
            <input type="file" className="edit-inputs"/>
          </div>
          <button type="submit" onClick={cerateInfo}>send</button>
        </form>
      </Modal>
    </div>
  );
};

export default HomePages;


// import React, { useEffect, useState } from "react";
// import "./HomePages.css";
// import { toast } from "react-toastify";
// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
// import axios from "axios";
// import { Button, Modal } from "antd";

// const HomePages = () => {
//   const [openEdit, setOpenEdit] = useState(false);
//   const [info, setInfo] = useState([]);

//   const getInfo = () => {
//     fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
//       .then((res) => res.json())
//       .then((data) => {
//         setInfo(data?.data);
//       });
//   };

//   useEffect(() => {
//     getInfo();
//   }, []);

//   const [open, setOpen] = useState(false);
//   const [nameEn, setNameEn] = useState("");
//   const [nameRu, setNameRu] = useState("");
//   const [picture, setPicture] = useState(null);
//   const [currentId, setCurrentId] = useState(null); // Current item ID for editing

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const InfoCreate = (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("accesstoken");
//     const formData = new FormData();
//     formData.append("name_en", nameEn);
//     formData.append("name_ru", nameRu);
//     formData.append("images", picture);

//     fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories", {
//       method: "POST",
//       body: formData,
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data?.success) {
//           toast.success(data?.message);
//           handleClose();
//           getInfo();
//         } else {
//           toast.error(data?.message);
//         }
//       })
//       .catch((err) => {
//         console.log(err?.message);
//       });
//   };

//   const deleteInfo = (id) => {
//     Modal.confirm({
//       title: "Delete Category",
//       content: "Are you sure you want to delete this category?",
//       maskClosable: true,
//       onOk() {
//         const token = localStorage.getItem("accesstoken");
//         const headers = {
//           Authorization: `Bearer ${token}`,
//         };
//         axios({
//           url: `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`,
//           method: "DELETE",
//           headers: headers,
//         })
//           .then((res) => {
//             toast.success(res?.data?.message);
//             getInfo();
//           })
//           .catch((err) => {
//             console.log("Error", err);
//             toast.error(err?.message);
//           });
//       },
//       onCancel() {
//         console.log("Cancel");
//       },
//     });
//   };

//   const showEditModal = (item) => {
//     setOpenEdit(true);
//     setNameEn(item?.name_en);
//     setNameRu(item?.name_ru);
//     setPicture(item?.image_src); // Image source for display
//     setCurrentId(item?.id); // Set the current item ID for editing
//   };

//   const closeEditModal = () => {
//     setOpenEdit(false);
//   };

//   const updateInfo = (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("accesstoken");
//     const formData = new FormData();
//     formData.append("name_en", nameEn);
//     formData.append("name_ru", nameRu);
    
//     // Check if the picture is a file object before appending
//     if (typeof picture === 'object') {
//       formData.append("images", picture);
//     }

//     fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${currentId}`, {
//       method: "PUT",
//       body: formData,
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data?.success) {
//           toast.success(data?.message);
//           closeEditModal();
//           getInfo();
//         } else {
//           toast.error(data?.message);
//         }
//       })
//       .catch((err) => {
//         console.log(err?.message);
//       });
//   };

//   return (
//     <div className="home">
//       <div className="container">
//         <div className="infoCreate">
//           <Button onClick={handleOpen}>Element Qoshish</Button>
//           <Modal open={open} onCancel={handleClose} footer={null}>
//             <form
//               style={{ marginTop: "50px" }}
//               className="post-form"
//               onSubmit={InfoCreate}
//             >
//               <input
//                 type="text"
//                 required
//                 placeholder="name_en"
//                 onChange={(e) => setNameEn(e.target.value)}
//               />
//               <input
//                 type="text"
//                 required
//                 placeholder="name_ru"
//                 onChange={(e) => setNameRu(e.target.value)}
//               />
//               <input
//                 className="post-file"
//                 type="file"
//                 accept="image/*"
//                 required
//                 onChange={(e) => setPicture(e.target.files[0])}
//               />
//               <button type="submit">Qo'shish</button>
//             </form>
//           </Modal>
//         </div>
//         <table>
//           <thead>
//             <tr>
//               <th>Inglizcha</th>
//               <th>Ruscha</th>
//               <th>Rasmlar</th>
//             </tr>
//           </thead>
//           <tbody>
//             {info?.map((item, index) => (
//               <tr key={index}>
//                 <td>{item?.name_en}</td>
//                 <td>{item?.name_ru}</td>
//                 <td>
//                   <img
//                     src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item?.image_src}`}
//                     alt=""
//                   />
//                   <DeleteOutlined
//                     onClick={() => deleteInfo(item?.id)}
//                     className="outlined"
//                   />
//                   <EditOutlined
//                     className="editoutlined"
//                     onClick={() => showEditModal(item)}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <Modal
//         title="tahrirlash "
//         open={openEdit}
//         onCancel={closeEditModal}
//         footer={null}
//       >
//         <form onSubmit={updateInfo}>
//           <input
//             type="text"
//             value={nameEn}
//             onChange={(e) => setNameEn(e?.target?.value)}
//           />
//           <input
//             type="text"
//             value={nameRu}
//             onChange={(e) => setNameRu(e?.target?.value)}
//           />
//           <div className="img-wrapper">
//             <img
//               className="edit-img"
//               src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${picture}`}
//               alt=""
//             />
//             <input
//               type="file"
//               className="edit-inputs"
//               onChange={(e) => setPicture(e.target.files[0])} // Update picture to file object
//             />
//           </div>
//           <button type="submit">send</button>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default HomePages;
