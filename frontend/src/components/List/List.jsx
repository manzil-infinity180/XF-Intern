import Navbar from "../Navbar/Navbar"
import "../Home/Home.css"
import Content from "../Content/Content";
import { useQuery } from "@tanstack/react-query"
import { getAppliedData } from "../utils/http";
import { Loader } from "../utils/Loader";
import { useState } from "react";
import { ErrorPage } from "../utils/ErrorPage";
function List() {
    const [jobDetail,setJobDetail] = useState([]);

    const {data,isError,isLoading,isPending,error} = useQuery({
        queryKey:['applied'],
        queryFn: getAppliedData
    });
    data && console.log(data);
    isError && console.log(error.info.err);
    const selector = {
        error: isError ? error.info.err : "Something went wrong 🫤"
    }
    return (
        <>
        {/* <Navbar /> */}
        <section className="w-full section_content">
            <div>
             <h1 className="text-center mt-4 text-5xl font-bold tracking-wider" 
             >{"Your Application".toUpperCase()}</h1>
            </div>
            <div className="flex items-center my-10 flex-col justify-center ">
            {
                data && data.user.applied.map((data)=> <Content data={data} key={data._id} applyBool={true}
                 />)
            }
            {
                (data && data.user.applied.length === 0) && <>
                <h1 style={{ fontSize:"1.25rem"}}>You do not applied to any Company yet</h1>
                <img src="https://pbs.twimg.com/media/GI_KeGOW4AAq_Sh?format=jpg&name=360x360" alt="bro-crying" style={{
                    margin:"15px 0"
                }}/>
                </>
                
            }
            {
                !data && !(isLoading || isPending) && <ErrorPage message={"No Application Yet 🥹"} selector={selector}/>
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
