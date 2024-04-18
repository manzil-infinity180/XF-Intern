import { useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getAllAdminDetail } from "../../redux/actions/adminAction";
import { AdminAllPost } from "../ADMIN/AdminAllPost";
import Content from "../Content/Content";
import { Loader } from "../utils/Loader";
export function CompanyDetailsAndOpening() {
    const {adminId} = useParams();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllAdminDetail(adminId));
    },[dispatch,adminId]);
    const selector = useSelector(s => s.admin);
    const {adminDetail} = selector;
    // console.log(selector);
    // const {post} = adminDetail;

    console.log(selector);
    return (
        <>
         {adminDetail && <div>
            <div className='container-big'>
                <div className='container-child' style={{
                    width:"200px",
                    height:"200px",
                    // border:"4px solid white",
                    borderBottom:"none",
                    margin:"0 !important"
                }}>
                    <img src="https://res.cloudinary.com/dk9gvtcgx/image/upload/v1709552988/photo/na9swtokmgrlqawtraon.jpg" alt="" style={{
                        maxWidth:"200px",
                        maxHeight:"200px",
                        borderRadius:"9999px",
                        width:"200px",
                        height:"200px"
                    }}/>
                </div>
                {adminDetail && <div className='container-child'>
                    <h2>Company Name :{adminDetail.name.toUpperCase()} </h2>
                    <h2> Summary: {adminDetail.summary}</h2>
                    <h2>Year of Establishment : {adminDetail.year}</h2>
                    <h2>Website : <Link to={adminDetail.website} >{adminDetail.website} </Link></h2>
                    <h2>LinkedIn : <Link to={adminDetail.linkedin}>{adminDetail.linkedin}</Link></h2>
                    <h2>Hiring Since : {adminDetail.hiring}</h2>
                    <h2>Emolyees : {Math.abs(adminDetail.employee)}</h2>
                </div>}
            </div>
        </div>}
        <section className="w-full section_content">
       {( adminDetail && adminDetail.post) ? <><div>
             <h1 className="text-center mt-8 text-5xl font-bold tracking-wider" style={{
                letterSpacing:"0.45rem",
                textDecoration:"uppercase"
             }}
             >{"All Openings".toUpperCase()}</h1>
            </div>
        <div className="flex items-center my-10 flex-col justify-center ">
        {
            adminDetail && adminDetail.post.map((el)=> <Content data={el} key={el._id} />)
        }
        </div> </>: <Loader />}
        </section> 
        </>
    );
}
