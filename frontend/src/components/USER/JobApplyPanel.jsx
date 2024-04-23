import Navbar from "../Navbar/Navbar";
import { Loader } from "../utils/Loader";
import { JobDetails } from "./JobDetails";
import {useDispatch,useSelector} from "react-redux";
import { getAllPost } from "../../redux/actions/postAction";
import { useEffect } from "react";
export function JobApplyPanel() {
    const dispatch = useDispatch();
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
            <Navbar />
            <section className="w-full section_content">
                <div>
                    <h1 className="text-center mt-8 text-4xl font-bold tracking-wider"
                    >XF - Opening</h1>
                </div>

                {selector.aPost ? selector.aPost.map(el => <JobDetails data={el} key={el._id} />) : <Loader />}
                {
                    !selector.aPost.length && <>
                    <div className="basic_div" style={{
                        marginTop:"5%"
                    }}>
                        <h1 style={{
                            fontSize:"1.25rem"
                        }}>No Post yet </h1>
                    </div>
                    </>
                }

            </section>

        </>

    );
}
