import Navbar from "..//Navbar/Navbar"
import "./Home.css"
import { useEffect, useState } from "react"
import Content from "../Content/Content";
function Home() {
    const [jobDetail,setJobDetail] = useState([]);
    useEffect(function(){
        async function fetchData(){
            const res = await fetch('https://job-56wq.onrender.com/api/v1');
            const data = await res.json();
            console.log(data);
            setJobDetail(data.data.detail);
        }
        fetchData();
        
    },[])
    console.log(jobDetail);
    return (
        <>
        <Navbar />
        <section className="w-full section_content">
            <div>
             <h1 className="text-center mt-8 text-4xl font-bold tracking-wider" 
             >InternShip / Jobs </h1>
            </div>
            <div className="flex items-center my-10 flex-col justify-center ">
            {
                jobDetail && jobDetail.map((data)=> <Content data={data} key={data._id}/>)
            }
            </div>
        </section>

        </>
      
    );
}

export default Home;