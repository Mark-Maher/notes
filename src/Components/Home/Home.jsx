import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Empty from '../Empty/Empty';
import Loading from '../Loading/Loading';
import Note from '../note/note';
function Home() {

    /* ==========  Stats  ==========  */
    const [iserror, setError] = useState(null)
    const [isLoading, setisLoading] = useState(false)



    /* ==========  Context  ==========  */
    const [notes, setNotes] = useState([])

    /* ========== Modal ==========  */
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    /* ========== Add Note  ========== */
    async function addNote(values) {
        try {
            let { data } = await axios.post("https://note-sigma-black.vercel.app/api/v1/notes",
                values,
                { headers: { token: localStorage.getItem("userTokennote") } }
            );
            // console.log(data)
            handleClose()
            if (data.msg === 'done') {

                getAllNotes()
                formik.resetForm();
                console.log("done")
                setError(null);

            }
        } catch (error) {
            // console.log(error)
            setError(error.response.data.msg);

        }

    }

    /* ========== Get All Notes ========== */

    async function getAllNotes() {
        setisLoading(true);
        try {

            let { data } = await axios.get("https://note-sigma-black.vercel.app/api/v1/notes", { headers: { token: localStorage.getItem("userTokennote") } })
            // console.log(data)
            setisLoading(false);
            // if (data.notes.length > 0) {
            //     setNotes(data.notes)

            // }

            if (data.msg === 'done') {
                setNotes(data.notes)
            }

        } catch (error) {
            setisLoading(false);
            if (error.response.data.msg === 'not notes found') {

                setNotes([])

            }
            console.log(error.response.data.msg)

        }
    }

    useQuery("getNotes", getAllNotes)




    function logout() {
        localStorage.removeItem('userTokennote')
    }
    /* ========== Formik ========== */

    let formik = useFormik({

        initialValues: {
            title: "",
            content: "",
        },
        onSubmit: addNote
    })

    return <>
        <div className="home">
            {/* Side-Bar */}
            <aside>
                <div className="links">
                    <button onClick={handleShow} className='fisrt'>+ New Note</button>

                    <Link to={'/'} className='fist'> <i className='fa fa-home'></i> Home</Link>
                    <Link to={'/login'} onClick={logout} className='fisrt'><i className="fa-solid fa-right-to-bracket"></i> Logout</Link>
                </div>
            </aside>

            {/* Notes */}

            <div className=" main py-5">
                <div>
                    <div className='container'>
                        <h1> <i className="fa-regular fa-folder-open"></i> My Notes
                            <div className="link-md">
                                <button onClick={handleShow} >+ New Note</button>

                                <Link to={'/'} > <i className='fa fa-home'></i> </Link>
                                <Link to={'/login'} onClick={logout} ><i className="fa-solid fa-right-to-bracket"></i> </Link>
                            </div>
                        </h1>


                        <div className="row g-3">
                            {notes.length === 0 ? (

                                <Empty />
                            ) : (
                                <>
                                    {isLoading ? <Loading /> : null}
                                    {notes?.map((note) => (
                                        <Note key={note._id} notes={note} getAllNotes={getAllNotes} />
                                    ))}
                                </>
                            )}

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add Note</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <form className='form-add'>
                                        {iserror ? <span className="text-danger text-center d-block mb-2 fw-bold">{iserror}</span> : null}
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            className="form-control mb-3"
                                            name="title"
                                            value={formik.values.title}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />


                                        <textarea placeholder="Description"
                                            className="form-control"
                                            name="content"
                                            value={formik.values.content}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur} cols="30" rows="5"></textarea>
                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={formik.handleSubmit}>
                                        Add Note
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>


                    </div>

                </div>
            </div>
        </div>


    </>
}

export default Home
