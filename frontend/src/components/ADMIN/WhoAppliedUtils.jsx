import { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { changeStats } from "../../redux/actions/adminAction";
import '../Content/Content.css';
import { UserDetailsPreview } from "../USER/UserDetailsPreview";
export function WhoAppliedUtils({ data, appliedPostDetail }) {
    let detailForStatusChange = { ...appliedPostDetail, "userId": data._id };
    const [status, setStatus] = useState('');
    const [details, setDetails] = useState(false);
    useEffect(() => {
        async function fetchData() {
            const res = await fetch('https://xfintern-backend.onrender.com/api/post/status/getStatus', {
                method: "POST",
                body: JSON.stringify(detailForStatusChange),
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json'
                },
            });
            const { output } = await res.json();
            setStatus(output.status);
        }
        fetchData();
    }, [status, detailForStatusChange]);
    function togglePopup() {
        setDetails(!details);
        if (!details) {
            document.querySelector('.blurMe').classList.add('blur-background')
        } else {
            document.querySelector('.blurMe').classList.remove('blur-background')
        }
    }
    return (
        <div className="flex items-center my-10 flex-col justify-center" id={data._id}
            style={{
                margin: "20px 0"
            }}>
            <div className='w-3/5 p-9 rounded-lg my-8 content-bg-image blurMe'>
                {/* <div className='flex justify-center'> */}
                <h1>Name : {data.name}</h1>
                <p>Email : {data.email}</p>
                <p>Skills : C++, Html, Golang, CSS, PHP (Not Availble)</p>
                <h3>Linkedin : {data.linkedin} </h3>
                <h3>Github : {data.github}</h3>
                <h3>Passing Year : {data.year}</h3>
                <h3>College Name : {data.college_name}</h3>
                <h3>Degree : {data.degree}</h3>
                {status && status.length != 0 && <SelectFiledStatus data={data} post={detailForStatusChange} status={status} />}
                <button style={{
                    borderRadius: "24px", border: "1px solid rgba(194, 185, 185, 0.8)", backgroundColor: "transparent",
                    padding: "5px 5px", fontWeight: "450", margin: "8px 0", letterSpacing: "0.15rem", width: "15%"
                }}
                    className='hover:scale-[1.05] transition-all duration-300 ease-out cursor-pointer'
                ><a href={"#"}>Resume</a></button>
                {/* </div> */}
            </div>
            {details && <div className='popup' id='popupBlur'>
                <div className="popup-content content-bg-image">
                    <span className="close" onClick={togglePopup}>&times;</span>
                    <UserDetailsPreview />
                </div>

            </div>}
        </div>
    );
}

function SelectFiledStatus({ data, post, status }) {
    const [value, setValue] = useState(status);
    const [currentStatus, setCurrentStatus] = useState(false);
    // const [currentPost,setcurrentPost] = useState(post);
    const dispatch = useDispatch();
    function handleChange(e) {
        setValue(e.target.value);
        setCurrentStatus(true);
    }
    function handleSubmit(e) {
        e.preventDefault();
        const formdata = new FormData(e.target);
        let dataForm = Object.fromEntries(formdata);
        dataForm = { ...dataForm, ...post };
        dispatch(changeStats(dataForm));
    }
    return <>
        <form onSubmit={handleSubmit}>
            <select name="status" value={value} className="select_post" onChange={handleChange} style={{
                width: "20%",
                margin: "15px 0"
            }} >
                <option value="pending">Pending</option>
                <option value="notselected">Not Selected</option>
                <option value="selected">Selected</option>
                <option value="inprogress">In Progress</option>
            </select>
            {currentStatus && <button style={{
                cursor: "pointer",
                backgroundColor: "pink",
                color: "black",
                borderRadius: "25px",
                padding: "6px 12px",
                margin: "5px"
            }} type="submit"> Update </button>}
        </form>
    </>
}