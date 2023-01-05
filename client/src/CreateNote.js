import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./App.css";

const CreateNote = () => {
    const navigate = useNavigate();
    const [ note, setNote ] = useState({
	title: "",
	content: "",
    })

    const handleChange = (e) => {
	const { name, value } = e.target;

	setNote(prev => {
		return ({
			...prev,
			[name] : value
		})
	})
    };

    const handleSubmit = (e) => {
	e.preventDefault();

	axios
	.post("/create", note).then((res) => console.log(res)).catch((err) => console.log(err));
	navigate("notes");
	
    };

    return (
    <div className="text-center">
      <h1 className="mt-3">Create Notes</h1>

      <center >
       <form className="bg-sky-200 text-center p-4 rounded-2xl">
  	 <input type="text" value={note.title} name="title" placeholder="title of note" className="w-6/12 rounded-lg border-2 border-sky-500 m-2 p-1 mt-5" onChange={handleChange} required/>
   	<input type="text" value={note.content} name="content" placeholder="content of note" className="w-6/12 rounded-lg border-2 border-sky-500 m-2 p-1" onChange={handleChange} required/>
	<br />
	<button type="submit" onClick={handleSubmit} className="bg-green-500 p-2 rounded-lg transition-all hover:rounded-full ease-in-out mt-5 mb-3 hover:bg-green-600">+ create note</button>
       </form>
      </center>

      <br />
      <button onClick={() => navigate(-1)} className="bg-sky-500 p-2 rounded-lg hover:bg-sky-600 hover:text-white transition-all ease-in-out">back</button>
      <button onClick={() => navigate('/create/notes')} className="bg-yellow-500 p-2 rounded-lg hover:bg-yellow-600 hover:text-white transition-all ease-in-out ml-2">all notes</button>
    </div>
  );
};

export default CreateNote;
