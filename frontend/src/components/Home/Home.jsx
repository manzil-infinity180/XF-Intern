import Navbar from "../Navbar/Navbar"
import "./Home.css"
import { FaGithub,FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useEffect, useState } from "react"
import { MdEmail } from "react-icons/md";
import Content from "../Content/Content";
import { Loader } from "../utils/Loader";
import SearchField from "../Search/SearchField";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostofAllAdmin } from "../../redux/actions/postAction";
import { Link } from "react-router-dom";
function Home() {
    const [page, setPage] = useState(0);
    // const {data,isError,isLoading,isPending,error} = useQuery({
    //     queryKey:['intern'],
    //     queryFn: getInternData
    // });
    // data && console.log(data);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllPostofAllAdmin(10,page));
    },[dispatch,page]);
    const selector = useSelector(s=>s.adminPost);
    selector && console.log(selector);
    return (
        <>
        <Navbar />
        
        <section className="w-full section_content">
            <div>
             <h1 className="title-page" style={{
                letterSpacing:"0.45rem"
             }}
             >{"InternShip / Jobs".toUpperCase()} </h1>
            </div>
            <SearchField />
            {(selector && selector.allPostExist) ?<div className="flex items-center my-10 flex-col justify-center ">
                {
                    selector && selector.allPostExist.length!==0 && selector.allPostExist.map((data)=> 
                <Content data={data} key={data._id} />)

                }
            </div> : <Loader />}
            
        </section>
        {selector && selector.allPostExist && <div style={{
            display:"flex",
            justifyContent:"center",
            margin:"20px 0"
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
        </div>}
        <div style={{
            backgroundColor:"rgba(59,59,59,0.35)",
            display:"flex",
            justifyContent:"center"
        }}>
           
            <div style={{
                margin:"50px 0 0"
            }}>
                 <h1 className="text-center text-5xl font-bold tracking-widest" >Xf Intern</h1>
                 <p className="text-center text-2xl" >Where startups and job seekers connect</p>
            <img src="https://res.cloudinary.com/dk9gvtcgx/image/upload/v1713337557/job-logo/knycmbmkqrcfzpx3r2au.png" alt=""
         className='hover:scale-[1.10] transition-all duration-300 ease-out cursor-pointer'
        width="500px" height="500px" 
        loading="lazy"
        />
    <div style={{
        display:"flex",
        justifyContent:"center",
        marginBottom:"35px"
    }}>
         
        <Link to={"https://linkedin.com/company/xf2809"} style={{margin:"0 10px",fontSize:"1.75rem"}} target="blank"><FaLinkedin /></Link>
        <Link to={"https://twitter.com/xfintern"} style={{mLinkrgin:"0 10px",fontSize:"1.75rem"}} target="blank"><FaXTwitter /></Link>
        <Link to={"https://github.com/manzil-infinity180"} style={{margin:"0 10px",fontSize:"1.75rem"}} target="blank"><FaGithub /></Link>
        <Link to={"mailto:xfintern@gmail.com"} style={{margin:"0 10px",fontSize:"1.75rem"}} target="_top"><MdEmail /></Link>
  </div>

        <p style={{
            marginBottom:"5%",
            textAlign:"center"
        }}>Copyright © 2024 XF Intern (formerly Xf). All rights reserved.</p>
            </div>
        
        </div>

        </>
      
    );
}

export default Home;
