import Navbar from "../Navbar/Navbar"
import "./Home.css"
import { useEffect, useState } from "react"
import Content from "../Content/Content";
import { useQuery } from "@tanstack/react-query"
import { getAppliedData, getInternData } from "../utils/http";
import toast from 'react-hot-toast';
import { Loader } from "../utils/Loader";
import SearchField from "../Search/SearchField";
function Home() {
    const [jobDetail,setJobDetail] = useState([]);
    
    const {data,isError,isLoading,isPending,error} = useQuery({
        queryKey:['intern'],
        queryFn: getInternData
    });
    data && console.log(data);

    

    
    
    return (
        <>
        <Navbar />
        <section className="w-full section_content">
            <div>
             <h1 className="text-center mt-8 text-4xl font-bold tracking-wider" 
             >InternShip / Jobs </h1>
            </div>
            <SearchField />
            <div className="flex items-center my-10 flex-col justify-center ">
            {
                data && data.detail.map((data)=> <Content data={data} key={data._id} error={error}/>)
            }
            {
                (isLoading || isPending) && <Loader />
            }
            </div>
        </section>

        </>
      
    );
}

export default Home;