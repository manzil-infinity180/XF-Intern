import { useState } from "react";
import { useMutation } from "@tanstack/react-query"
import toast from 'react-hot-toast';
import {queryclient, uploadUserPhoto} from "../utils/http";
import './UploadImage.css'
import {useNavigate} from 'react-router-dom'
export function UploadImages() {
    const [file,setFile] = useState(null);
    const navigate = useNavigate();
    const {mutate,isPending,isError,error} = useMutation({
        mutationFn : uploadUserPhoto,
        onSuccess: () => {
            toast.success("Step2 : Image uploaded successfully");
            navigate('/step3');
      },
      onError : ()=>{
        toast.error("Something went wrong");
        toast.error(error.info.message)
      },
    })

   
    function handleUploadfile(){
        const data = new FormData();
        data.append("pic", file);
        mutate(data);
    }
    
    return (
        <div className="upload_div">
             <h1 style={{
                fontSize:"2.5rem"
             }}>Upload and share your images.</h1>
             <p className="text_drag">Drag and drop to their specific position and start uploading your images now. 10 MB limit.
             And then simply click to Upload
                </p>
            <div>
            </div>
            <div className="div_input">
            <p className="p_ele">Profile Picture</p>
            <input 
               type="file"
               onChange={(e)=>setFile(e.target.files[0])}
               multiple={false}
               />
               {
                file && <p style={{color:"blue"}}>{file.name}</p>
               }
            
               <button className="button_upload"
               onClick={handleUploadfile}
               >Upload Image</button>
               </div>
        </div>
    );
}