import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserDetails } from '../../redux/actions/adminAction';

export function UserDetailsPreview({ id }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserDetails(id));
    }, [dispatch, id]);
    const selector = useSelector(s => s.admin);
    const { userDetail } = selector;
    return (
        <>
            {userDetail && <div>
                <div>
                    <div style={{
                        width: "200px",
                        height: "200px",
                        borderBottom: "none",
                        margin: "0 !important"
                    }}>
                        <img src="https://res.cloudinary.com/dk9gvtcgx/image/upload/v1709552988/photo/na9swtokmgrlqawtraon.jpg" alt="" style={{
                            maxWidth: "200px",
                            maxHeight: "200px",
                            borderRadius: "9999px",
                            width: "200px",
                            height: "200px"
                        }} />
                    </div>
                    {
                        userDetail && <div className='container-child'>
                            <h2>{userDetail.name} </h2>
                            <h2>{userDetail.college_name}</h2>
                            <p>Year of Establishment : {userDetail.degree}</p>
                            <p>Email : {userDetail.email}</p>
                            <p>Website</p>
                            <Link to={userDetail.website} ><p>{userDetail.website}</p> </Link>
                            <p>LinkedIn</p>
                            <Link to={userDetail.linkedin}>{userDetail.linkedin}</Link>

                        </div>
                    }

                </div>
            </div>}
        </>
    );
}
