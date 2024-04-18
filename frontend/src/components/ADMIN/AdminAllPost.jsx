import { useEffect, useState } from "react";
import Content from "../Content/Content";
import Navbar from "../Navbar/Navbar";
import { Loader } from "../utils/Loader";
import { useDispatch, useSelector } from "react-redux"
import { getAllPost } from "../../redux/actions/postAction";
import { PostContent } from "./PostContent";
import { Link } from "react-router-dom";
import { GoBack } from "../utils/GoBack";
import {ErrorPage} from "../utils/ErrorPage";
export function AdminAllPost() {
    const [jobDetail, setJobDetail] = useState([]);

    const dispatch = useDispatch();

    // dispatch(getAllPost());
    // const selector = useSelector(s=>s.adminPost);
    const selector1 = useSelector(s => s.admin);
    console.log(selector1);
    useEffect(() => {
        dispatch(getAllPost());
    }, [dispatch]);
    const selector = useSelector(s => s.adminPost);
    console.log(selector);
    selector.aPost && console.log(selector.aPost);



    return (
        <>
            {/* <Navbar /> */}

            {/* <GoBack /> */}
            <section className="w-full section_content">
                <div>
                    <h1 style={{ letterSpacing:"0.15rem"}}className="text-center mt-3 text-5xl font-bold tracking-wider"
                    >{"XF - Opening".toUpperCase()}</h1>
                </div>

                {selector.aPost && selector.aPost.map(el => <PostContent data={el} key={el._id}/>)}
                {
                    !selector.aPost.length && <>
                    {!selector.error && <div className="basic_div" style={{
                        marginTop:"5%"
                    }}>
                        <h1 style={{
                            fontSize:"1.25rem"
                        }}>No Post yet <Link to={'/admin/post'} style={{
                            backgroundColor:"white",
                            color:"black",
                            borderRadius:"0.345rem",
                            margin:"0 5px",
                            padding:"4px",
                            
                        }}>Click Here</Link></h1>
                    </div>}
                    
                    </>
                }

            </section>
           
                    {
                        selector.error ? <ErrorPage selector={selector} message={"No Post Available 😟"}/> : <Loader />
                    }

        </>

    );
}