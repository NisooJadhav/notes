import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { InfinitySpin } from "react-loader-spinner";
import moment from "moment";
import * as timeago from 'timeago.js';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import "bootstrap/dist/css/bootstrap.min.css";

const Notes = () => {
const [notes, setNotes] = useState([]);
const [updatedNote, setUpdatedNote] = useState({});

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const [spinner, setSpinner] = useState(false);

useEffect(()=>{
  setSpinner(true);
  axios.get("/notes")
  .then((res)=>{
    if (res) {
      setSpinner(false);
      setNotes(res.data);
    }
  })
  .catch((e) => console.log(e));
},[]);

const navigate = useNavigate();

const handleChange = (e) => {
  const { name, value } = e.target;
  
  setUpdatedNote(prev=>{
    return({
      ...prev,
      [name]: value,
    })
  })
}

const updateNote = (post) => {
    handleShow();
    setUpdatedNote(post)
}

const deleteNote = (id) => {
    console.log(`deleted: ${id}`);
    axios.delete(`/delete/${id}`)
    .then(res => console.log(res))
    .catch((e) => console.log(e));

    window.location.reload()
}

const saveUpdatedNote =() => {
    axios.put(`/update/${updatedNote._id}`, updatedNote)
    .then(res => console.log(res))
    .catch((e)=>console.log(e));

    handleClose();
    window.location.reload();
}

  return (
  <div className="text-center">
    <h1 className="mt-3">Notes page</h1>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form className="w-full">
                <Form.Group>
                    <Form.Control type="text" name="title" value={updatedNote.title ? updatedNote.title : ''} className="w-full border-2 pl-2 mb-2 w-full" placeholder="update title" onChange={handleChange} />
                    <Form.Control type="text" name="content" value={updatedNote.content ? updatedNote.content : ''} className="w-full border-2 pl-2 mb-2 w-full" placeholder="update content" onChange={handleChange} />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveUpdatedNote}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      
    {spinner ?
      (
          <>
              <center style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "55vh" }}>
                  <InfinitySpin
                      width="200"
                      color="#42d392"
                      wrapperStyle
                      wrapperClass
                  />
              </center>
          </>
      ) :
      (
      <center>
        {notes.map(note => {
          return (
            <div key={note._id} className="flex flex-col bg-sky-400 border-sm w-[20%] p-2 rounded-lg m-4">
              <h2 className="text-3xl text-zinc-800 mt-5">{note.title}</h2>
              <p className="text-2xl text-zinc-600 mb-5">{note.content}</p>
              <p>created at: {moment.utc(note.createdAt).format('Do MMM YYYY')}</p>
              <p>last updated: {timeago.format(moment.utc(note.updatedAt).format('MM/DD/YYYY'))}</p>
              <div className="flex flex-row justify-center text-md pt-0 mt-0">
                <button className="mt-4 bg-green-500 ease-in duration-300 hover:bg-green-600 rounded-lg p-2 m-2 text-1xl text-black w-full" onClick={() => updateNote(note)}>update</button>
                <button className="mt-4 bg-rose-500 ease-in duration-300 hover:bg-rose-600 rounded-lg p-2 m-2 text-1xl text-black w-full" onClick={() => deleteNote(note._id)}>delete</button>
              </div>
            </div>
          )
        })}
      </center>
    )}

    <button className="mt-4 bg-rose-400 rounded-lg p-2" onClick={() => navigate(-1)}>back</button>
    <button className="mt-4 bg-teal-400 rounded-lg p-2 ml-2 mb-5" onClick={() => navigate('/')}>home</button>
  </div>
  )
}

export default Notes;
