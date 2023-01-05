import { useState, useEffect } from "react";
import axios from "axios";
import { MagnifyingGlass } from "react-loader-spinner";

const Search = () => {

  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [spinner, setSpinner] = useState(false);

  useEffect(()=>{
    setSpinner(true);

    axios.get("/notes")
    .then((res)=>{
      setSpinner(false);
      setNotes(res.data);
    })
    .catch((e)=>console.log(e))
  }, [])
  
  return(
    <>
      <input type="search" className="text-lg border-2 border-sky-600 rounded-lg mt-2 pl-2 mb-2" placeholder="🔍 search..." onChange={(e) => { setSearchTerm(e.target.value) }} />

      {spinner ?
        (
            <>
                <center style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "55vh" }}>
                    <MagnifyingGlass
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="MagnifyingGlass-loading"
                        wrapperStyle={{}}
                        wrapperClass="MagnifyingGlass-wrapper"
                        glassColor='#c0efff'
                        color='royalblue'
                    />
                </center>
            </>
        ) :
        (
          notes.filter((val)=>{
            if(searchTerm == '') return val; 
            else if(val.title.toLowerCase().includes(searchTerm.toLowerCase()) || val.content.toLowerCase().includes(searchTerm.toLowerCase())) return val;
          }).map((val, key) => {
            return(
              <center>
                <div className="bg-teal-200 w-4/12 m-2 mt-2">
                  <h4 className="pt-2">{val.title}</h4>
                  <p className="pb-2">{val.content}</p>
                </div>
              </center>
            )
          })
        )}
    </>
  )
}

export default Search
