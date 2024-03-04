import axios from "axios";
import {useFormik} from "formik";
import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
function Note({notes, getAllNotes}) {
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  /* ========== Delet Notes ========== */

  function remove(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be remove this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNote(id);

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  }

  async function deleteNote(noteId) {
    try {
      let {data} = await axios.delete(
        `https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,

        {headers: {token: localStorage.getItem("userTokennote")}}
      );
      console.log(data);
      getAllNotes();
    } catch (error) {
      console.log(error);
    }
  }

  /* ========== Update Note  ========== */
  async function update(values) {
    try {
      let {data} = await axios.put(
        `https://note-sigma-black.vercel.app/api/v1/notes/${notes._id}`,
        values,

        {headers: {token: localStorage.getItem("userTokennote")}}
      );
      console.log(data);

      if (data.msg === "done") {
        getAllNotes();
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  }
  let formik = useFormik({
    initialValues: {
      title: notes.title,
      content: notes.content,
    },

    onSubmit: update,
  });

  return (
    <>
      <div key={notes._id} className=' col-md-6 col-lg-4 '>
        <div className='note shadow'>
          {/* Content */}
          <div className='content'>
            <h2>{notes.title}</h2>
            <p>{notes.content}</p>
          </div>
          {/* operation  */}
          <div className='operation'>
            <i
              onClick={() => handleShow()}
              className='fa-regular fa-pen-to-square'
            ></i>
            <i
              onClick={() => remove(notes._id)}
              className='fa-solid fa-trash'
            ></i>
          </div>
        </div>
      </div>

      {/* ========== Model ========== */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='form-add'>
            <input
              type='text'
              placeholder='Title'
              className='form-control mb-2'
              name='title'
              defaultValue={notes.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <textarea
              placeholder='Description'
              className='form-control'
              name='content'
              defaultValue={notes.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              cols='30'
              rows='5'
            ></textarea>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={formik.handleSubmit}>
            Edit Note
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Note;
