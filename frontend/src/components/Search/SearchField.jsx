import { useQuery } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast"
import './SearchField.css'
import {useNavigate} from "react-router-dom"
import {useMutation} from "@tanstack/react-query"
import { autoCompleteFunc, searchField } from "../utils/http";
function SearchField() {
    const [searchTerm,setSearchTerm] = useState("");
    const [autoComplete,setAutoComplete] = useState([]);
    const navigate = useNavigate();

    const {data, mutate,error} = useMutation({
      mutationFn: searchField,
      onSuccess : (data) =>{
        console.log(data);
      },
      onError:(error)=>{
        toast.error(error.info.message);
      }

    });

    useEffect(()=>{
      async function functionFetch(x){
        
          const user = await autoCompleteFunc(x);
          setAutoComplete(user.results);
          // console.log(user);
          console.log(autoComplete);
  
        }
        if(searchTerm.length > 0){
          functionFetch(searchTerm);

        }
      
      
    },[searchTerm,autoComplete]);


     function handleSubmit(e){
           e.preventDefault();
           toast.success(searchTerm);
           mutate(searchTerm);
           setSearchTerm("");

          //  setTimeout(() => {
          //    navigate('/search')
          //  }, 1000);   
     }
    
    
    // data && console.log(data.searchedObj.length);

    return (
      <>
        <div style={{textAlign:"center", margin:"100px 0"}}>
            <form 
            onSubmit={handleSubmit} 
            id="search-form">
          <input
           className="input_field_search"
            type="search"
            placeholder="Search Job/Internship . . ."
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
          <button type="submit"
          className="submit_btn_input">Search</button>
        </form>
        {(autoComplete.length > 0 && searchTerm.length >0 ) && <ul>
        { 
        autoComplete.map((el)=>
          <li key={el._id} style={{
            padding:"4px 2px",
            border:"1px solid black",
            cursor:"pointer",
            display:"flex",
            margin:"2px auto",
            width:"50%",
            textAlign:"center",
            justifyContent:"center",
            // width:"50%",
            
            backgroundColor:"rgb(10, 16, 31)"

          }}>
            RoleName: {el.roleName} Company: {el.companyname}
          </li>

        )
        }
        </ul>}
       
            
        </div>
         {/* <div className='div_content'>
         {
           data && data.searchedObj.map((user)=>
             
             <ContentUser user={user} key={user._id} />
         ) 
         }
         {
          data && data.searchedObj.length===0 && <h1 style={{textAlign:"center", 
          color:"#7f8ea3",letterSpacing:"0.1cm"}}>
            No user found</h1>
         }
        
      </div> */}
      </>
    );
}

export default SearchField;