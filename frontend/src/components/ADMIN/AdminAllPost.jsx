import { useEffect } from "react";
import { Loader } from "../utils/Loader";
import { useDispatch, useSelector } from "react-redux"
import { getAllPost } from "../../redux/actions/postAction";
import { PostContent } from "./PostContent";
import { Link } from "react-router-dom";
import { ErrorPage } from "../utils/ErrorPage";
// import { GoPrevPage } from "../utils/GoPrevPage";
export function AdminAllPost() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllPost());
    }, [dispatch]);
    const selector = useSelector(s => s.adminPost);
    return (
        <>
            {/* <GoPrevPage /> */}
            <section className="w-full section_content">
                <div>
                    <h1 style={{ letterSpacing: "0.15rem" }} className="text-center mt-3 text-5xl font-bold tracking-wider"
                    >{"XF - Opening".toUpperCase()}</h1>
                </div>
                {selector.aPost ? selector.aPost.map(el => <PostContent data={el} key={el._id} />) :
                    (!selector.aPost && (!selector.aPost && selector.error)) ? <ErrorPage selector={selector} message={"No Post Available 😟"} /> : <Loader />
                }
                {
                    !selector.aPost.length && <>
                        {!selector.error && <div className="basic_div" style={{
                            marginTop: "5%"
                        }}>
                            <h1 style={{
                                fontSize: "1.25rem"
                            }}>No Post yet <Link to={'/admin/post'} style={{
                                backgroundColor: "white",
                                color: "black",
                                borderRadius: "0.345rem",
                                margin: "0 5px",
                                padding: "4px",

                            }} data-testid="click-here-btn">Click Here</Link></h1>
                        </div>}
                    </>
                }
            </section>
        </>

    );
}