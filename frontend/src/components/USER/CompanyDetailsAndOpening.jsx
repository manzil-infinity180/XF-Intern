import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllAdminDetail } from "../../redux/actions/adminAction";
import Content from "../Content/Content";
import { Loader } from "../utils/Loader";
import { GoPrevPage } from "../utils/GoPrevPage";
export function CompanyDetailsAndOpening() {
    const { adminId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllAdminDetail(adminId));
    }, [dispatch, adminId]);
    const selector = useSelector(s => s.admin);
    const { adminDetail } = selector;

    return (
        <>
            <GoPrevPage />
            {adminDetail && <div>
                <div className='container-big' data-testid="admin-detail-box">
                    <div className='container-child' style={{
                        width: "200px",
                        height: "200px",
                        borderBottom: "none",
                        margin: "0 !important"
                    }}>
                        <img src={adminDetail.image} alt="" style={{
                            maxWidth: "200px",
                            maxHeight: "200px",
                            borderRadius: "9999px",
                            width: "200px",
                            height: "200px"
                        }} />
                    </div>
                    {adminDetail && <div className='container-child'>
                        <h2>Company Name :{adminDetail.name.toUpperCase()} </h2>
                        <h2> Summary: {adminDetail.summary}</h2>
                        <h2>Year of Establishment : {adminDetail.year}</h2>
                        <h2>Hiring Since : {adminDetail.hiring}</h2>
                        <h2>Emolyees : {Math.abs(adminDetail.employee)}</h2>
                        <div style={{
                            margin: "10px 0"
                        }}>
                            {adminDetail.website && <a href={adminDetail.website} ><button
                                className='btn_clickable hover:scale-[1.05] transition-all duration-300 ease-out cursor-pointer'
                            >Website</button> </a>}
                            {adminDetail.linkedin && <a href={adminDetail.linkedin}><button
                                className='btn_clickable hover:scale-[1.05] transition-all duration-300 ease-out cursor-pointer'
                            >Linkedin</button></a>}
                        </div>
                    </div>}
                </div>
            </div>}
            <section className="w-full section_content">
                {(adminDetail && adminDetail.post) ? <><div>
                    <h1 className="text-center mt-8 text-5xl font-bold tracking-wider" style={{
                        letterSpacing: "0.45rem",
                        textDecoration: "uppercase"
                    }}
                    >{"All Openings".toUpperCase()}</h1>
                </div>
                    <div className="flex items-center my-10 flex-col justify-center ">
                        {
                            adminDetail && adminDetail.post.map((el) => <Content data={el} key={el._id} />)
                        }
                    </div> </> : <Loader />}
            </section>
        </>
    );
}
