import Navbar from "../Navbar/Navbar"
import "../Home/Home.css"
import Content from "../Content/Content";
import { useQuery } from "@tanstack/react-query"
import { getAppliedData } from "../utils/http";
import { Loader } from "../utils/Loader";
import { useState } from "react";
function List() {
    const [jobDetail,setJobDetail] = useState([]);

    const {data,isError,isLoading,isPending} = useQuery({
        queryKey:['applied'],
        queryFn: getAppliedData
    });
    data && console.log(data);
    
    return (
        <>
        <Navbar />
        <section className="w-full section_content">
            <div>
             <h1 className="text-center mt-8 text-4xl font-bold tracking-wider" 
             >InternShip / Jobs Applied</h1>
            </div>
            <div className="flex items-center my-10 flex-col justify-center ">
            {
                data && data.user.applied.map((data)=> <Content data={data} key={data._id} applyBool={true}
                withdraw={true} />)
            }
            {
                (isLoading || isPending) && <Loader />
            }
            </div>
        </section>

        </>
      
    );
}

export default List;