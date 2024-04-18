

/// NOT WORKING YET


import { useState } from 'react';
export function Pagination() {
    const [page, setPage] = useState(0);
    return (
        <div style={{
            display:"flex",
            justifyContent:"center",
            margin:"10px 0 0"
        }}>
            {page > 0 && <button style={{
                margin:"0 30px",
                cursor:"pointer"
            }} onClick={()=> setPage(s => s-1)}
            className="submit_btn_input hover:scale-[1.05] transition-all duration-300 ease-out cursor-pointer"
            >Previous</button>}
           
            {
                page >=1 &&  <button style={{
                    margin:"0 30px",
                    cursor:"pointer"
                }}>{page}</button>
            }
            
             {page >=0 && <button style={{
                margin:"0 30px",
                cursor:"pointer"
            }} className="submit_btn_input hover:scale-[1.05] transition-all duration-300 ease-out cursor-pointer"
             onClick={()=> setPage(s => s+1)}>Next</button>}
        </div>
    );
}