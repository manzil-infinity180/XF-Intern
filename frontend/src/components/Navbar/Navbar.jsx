import { useEffect, useState } from 'react';
import './Navbar.css'
import InputField, { incValue } from '../utils/InputField';
import { getAppliedData, logoutAdmin, logoutUser } from '../utils/http';
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { ImCross } from 'react-icons/im';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { feedbackMe } from '../../redux/actions/postAction';

function Navbar() {

    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState({ user: false, admin: false });
    const [details, setDetails] = useState(false);
    useEffect(() => {
        if (sessionStorage.getItem("loginValue")) {
            const value = sessionStorage.getItem("loginValue")
            setIsLogin(JSON.parse(value));
        }
    }, [setIsLogin]);
    const { user: userLogin, admin: adminLogin, verify: verifyLogin } = isLogin;
    const { refetch } = useQuery({
        queryKey: ['profile', 'logout'],
        queryFn: logoutUser,
        enabled: false
    });
    const { refetch: logoutAdminFetch } = useQuery({
        queryKey: ["logout"],
        queryFn: logoutAdmin,
        enabled: false
    });
    function handlelogoutBtn() {
        refetch();
        setTimeout(() => {
            window.location.reload(false);
        }, 1000);

    }
    function handleAdmin() {
        logoutAdminFetch();
        setTimeout(() => {
            window.location.reload(false);
        }, 1000);
    }
    // useEffect(() => {
    //     if (isAuthenticated) {
    //         // setEnable(true);
    //     }
    // }, [isAuthenticated])
    function togglePopup() {
        setDetails(!details);
        if (!details) {
            document.querySelectorAll('.blurMe').forEach((element) => {
                element.classList.add('blur-background');
            });
        } else {
            document.querySelectorAll('.blurMe').forEach((element) => {
                element.classList.remove('blur-background');
            });
        }
    }

    function handleFeedbackSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        dispatch(feedbackMe(data));
        e.target.reset();
    }


    return (
        <>
            <section className='lg:container rounded-full bg-white/5 backdrop-blur-xl fixed top-2 lg:top-6 z-50 w-[calc(100vw-16px)] w-2/4 lg:w-full left-1/2 transform -translate-x-1/2 shadow-[0px_4px_16px_0px_rgba(0,0,0,0.10)]'>

                <nav className='flex flex-row gap-16 items-center h-[63px] pb-[2px] max-w-screen-2xl m-auto relative'>

                    <ul className='h-full flex items-center'>
                        <li className='h-full'>
                            <a href="" className='flex items-center h-full pl-4 lg:pl-8 pb-[6px]'>
                                <img src="https://res.cloudinary.com/dk9gvtcgx/image/upload/v1713337557/job-logo/knycmbmkqrcfzpx3r2au.png" alt=""
                                    width="165px"
                                    className='hover:scale-[1.05] transition-all duration-300 ease-out cursor-pointer'
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                    width="45" height="70" viewBox="0 0 2000 1520" className='xf-logo'>
                                    <g transform="matrix(1,0,0,1,-0.820741883743267,0.6153846153847553)"><svg viewBox="0 0 325 247" data-background-color="#000000" preserveAspectRatio="xMidYMid meet" height="1520" width="2000" xmlns="http://www.w3.org/2000/svg"
                                    ><g id="tight-bounds" transform="matrix(1,0,0,1,0.1333705561082752,-0.09999999999999432)"><svg viewBox="0 0 324.73325888778345 247.2" height="247.2" width="324.73325888778345"><g><svg viewBox="0 0 324.73325888778345 247.2" height="247.2" width="324.73325888778345"><g><svg viewBox="0 0 324.73325888778345 247.2" height="247.2" width="324.73325888778345"><g id="textblocktransform"><svg viewBox="0 0 324.73325888778345 247.2" height="247.2" width="324.73325888778345" id="textblock"><g><svg viewBox="0 0 324.73325888778345 247.2" height="247.2" width="324.73325888778345"><g transform="matrix(1,0,0,1,0,0)"><svg width="324.73325888778345" viewBox="0.55 -26.172569638844998 40.95 31.172569638844998" height="247.2" data-palette-color="#ffffff"
                                    ><path d="M1.9 5L1.9 5Q1.65 5 1.45 4.8L1.45 4.8Q1 4.4 0.78 4.08 0.55 3.75 0.55 3.25L0.55 3.25Q0.55 2.7 0.95 1.65L0.95 1.65Q3.65-4.85 16.75-15.7L16.75-15.7Q15.9-17.1 14.3-18.35 12.7-19.6 10.75-20.55L10.75-20.55Q10.6-20.65 10.6-20.75L10.6-20.75Q10.6-20.9 10.7-21L10.7-21Q10.95-21.45 11.75-21.8 12.55-22.15 12.95-21.95L12.95-21.95Q16.55-20.2 18.5-16.95L18.5-16.95Q27.2-23.85 30.1-24.95L30.1-24.95Q30.55-25.15 31-25.15L31-25.15Q31.7-25.15 31.7-24.5L31.7-24.5Q31.7-24 31.25-23.38 30.8-22.75 30.4-22.65L30.4-22.65Q29.3-22.3 27.53-21.3 25.75-20.3 23.58-18.9 21.4-17.5 19.1-15.85L19.1-15.85Q20.75-12.05 20.75-7.6L20.75-7.6Q20.75-3.85 19.55-0.75L19.55-0.75Q19.35-0.15 18.75-0.15L18.75-0.15Q18.05-0.15 18.35-1L18.35-1Q19.3-3.35 19.3-6.25L19.3-6.25Q19.3-10.35 17.4-14.55L17.4-14.55Q15.15-12.85 12.83-10.8 10.5-8.75 8.45-6.6 6.4-4.45 4.83-2.4 3.25-0.35 2.5 1.45L2.5 1.45Q2.45 1.5 2.4 1.68 2.35 1.85 2.25 2.1L2.25 2.1Q2.05 2.55 1.95 3L1.95 3Q1.9 3.1 1.9 3.35L1.9 3.35Q1.9 3.7 2.1 3.9L2.1 3.9Q2.35 4.15 2.35 4.45L2.35 4.45Q2.35 5 1.9 5ZM23.75 3.3L23.75 3.3Q23.2 3.3 22.82 2.95 22.45 2.6 22.5 2.1L22.5 2.1Q22.35 1.4 22.72 0.08 23.1-1.25 23.8-2.9 24.5-4.55 25.32-6.3 26.15-8.05 26.9-9.55L26.9-9.55 23.55-8.65 23.45-8.65Q23.1-8.65 23.1-9L23.1-9Q23.1-9.5 23.52-10.18 23.95-10.85 24.45-11L24.45-11Q24.95-11.2 25.85-11.35 26.75-11.5 28.1-11.7L28.1-11.7Q36.6-25.95 38.85-26.15L38.85-26.15Q41.5-26.45 41.5-22.8L41.5-22.8Q41.5-22.35 41.42-21.73 41.35-21.1 41.25-20.25L41.25-20.25Q41.2-19.75 40.9-19.75L40.9-19.75Q40.7-19.75 40.57-20.05 40.45-20.35 40.55-20.8L40.55-20.8Q40.7-21.7 40.7-22.3L40.7-22.3Q40.7-24.25 39.55-24.25L39.55-24.25Q38.4-24.25 35.9-20.65L35.9-20.65Q34.65-18.8 33.22-16.63 31.8-14.45 30.25-11.95L30.25-11.95Q30.7-12 31.15-12.03 31.6-12.05 32-12.05L32-12.05Q32.45-12.05 33.02-12.08 33.6-12.1 34.25-12.15L34.25-12.15Q34.65-12.45 35-12.45L35-12.45Q35.65-12.45 35.65-11.75L35.65-11.75Q35.65-11 34.8-11L34.8-11Q34.55-11 34.1-11.15L34.1-11.15Q32.8-11.05 32.1-10.93 31.4-10.8 30.8-10.63 30.2-10.45 29.2-10.2L29.2-10.2Q27.95-8.15 26.85-6.13 25.75-4.1 25.02-2.4 24.3-0.7 24.3 0.4L24.3 0.4Q24.3 1.4 25.1 1.45L25.1 1.45Q25.8 1.15 26.1 1.15L26.1 1.15Q26.45 1.15 26.45 1.4L26.45 1.4Q26.45 1.85 25.4 2.65L25.4 2.65Q24.6 3.3 23.75 3.3Z" opacity="1" transform="matrix(1,0,0,1,0,0)" fill="#ffffff"
                                        data-fill-palette-color="primary" id="text-0"></path></svg></g></svg></g></svg></g></svg></g><g></g></svg></g><defs></defs></svg><rect width="324.73325888778345" height="247.2" fill="none" stroke="none" visibility="hidden"></rect></g></svg></g></svg>

                            </a>
                        </li>
                    </ul>
                    <ul className='lg:flex lg:flex-row h-full group content-nav'>
                        {verifyLogin && <li className='relative h-full grid hover:text-[#02F67C]'>
                            <a href={(adminLogin) ? '/admin/profile/edits' : 'user/profile/edits'} style={{ backgroundSize: "200%" }} className='flex items-center h-full px-[30px] self-center font-normal text-[18px] bg-clip-text bg-linear-white-green bg-position-100 transition-colors ease-in duration-300 justify-center '>
                                Profile</a>
                        </li>}
                        {verifyLogin && <li className='relative h-full grid hover:text-[#02F67C] '>
                            <a href={(adminLogin) ? '/admin/post' : "/user/bookmark"} style={{ backgroundSize: "200%" }} className='flex items-center h-full px-[30px] self-center font-normal text-[18px] bg-clip-text bg-linear-white-green bg-position-100 transition-colors ease-in duration-300 justify-center '>
                                {(adminLogin) ? 'Create Post' : 'Bookmark'}</a>
                        </li>}
                        <li className='relative h-full grid hover:text-[#02F67C] '>
                            <a href="/company/docs" style={{ backgroundSize: "200%" }} className='flex items-center h-full px-[30px] self-center font-normal text-[18px] bg-clip-text bg-linear-white-green bg-position-100 transition-colors ease-in duration-300 justify-center '>
                                Docs</a>
                        </li>

                        {/* <li className='relative h-full grid hover:text-[#02F67C]'>
                            <a href="https://github.com/manzil-infinity180/Job-Internship-Finder" style={{ backgroundSize: "200%" }} target='_blank' className='flex items-center h-full px-[30px] self-center font-normal text-[18px] bg-clip-text bg-linear-white-green bg-position-100 transition-colors ease-in duration-300 justify-center'>
                                Contribute</a>
                        </li> */}
                    </ul>

                    <ul className='ml-auto hidden lg:flex lg:flex-row lg:gap-4 pr-8'>
                        {verifyLogin && <li>
                            <a href={adminLogin ? '/admin/allPost' : "/list"} className='block md:hover:border-[#02F67C] md:hover:border md:hover:text-[#fff] border-[transparent] border font-medium text-[16px] text-white max-h-[37px] px-4 py-2 rounded-full md:transition md:ease-in-out md:duration-300 '>
                                {adminLogin ? 'See All Post' : 'See Application'}
                            </a>
                        </li>}
                        {(!(adminLogin || userLogin) && !verifyLogin) && <li>
                            <a href={"/login"} className='block md:hover:border-[#02F67C] md:hover:border md:hover:text-[#fff] border-[transparent] border font-medium text-[16px] text-white max-h-[37px] px-4 py-2 rounded-full md:transition md:ease-in-out md:duration-300 '
                            data-testid="login-btn">
                                Login
                            </a>
                        </li>}
                        <li>
                            <a href="#"
                                style={{
                                    cursor: "pointer"
                                }}
                                onClick={togglePopup}
                                className='flex items-center hover:bg-transparent md:hover:border md:hover:text-[#fff] border-[#08160f] border bg-[#02d6f6] font-medium text-[16px] text-[#0A2121] max-h-[37px] px-4 py-2 rounded-full md:transition md:ease-in-out md:duration-300'
                            >
                                Your Feedbacks?
                            </a>
                        </li>
                        <li>
                            <a href={(!(adminLogin || userLogin) && !verifyLogin) && "/register"}
                                style={{
                                    cursor: "pointer"
                                }}
                                className='flex items-center hover:bg-transparent md:hover:border md:hover:text-[#fff] border-[#02F67C] border bg-[#02F67C] font-medium text-[16px] text-[#0A2121] max-h-[37px] px-4 py-2 rounded-full md:transition md:ease-in-out md:duration-300'
                                onClick={(adminLogin || userLogin) ? (adminLogin ? handleAdmin : handlelogoutBtn) : ()=>{return}}
                             data-testid="logout-register-btn">
                                {((adminLogin || userLogin) && verifyLogin) ? 'Logout' : 'Register'}
                            </a>
                        </li>

                    </ul>
                </nav>
            </section>
            <div>

            </div>
            {details && <div className='popup'>
                <div className="popup-content">

                    <div className='share-btn'>
                        <a href={`https://twitter.com/intent/post?text=Checkout Xf Intern here&url=https://xfintern.onrender.com/&via=xfintern`} target="_blank"><span className=''><FaXTwitter /></span></a>
                        <a href={`https://facebook.com/sharer/sharer.php?u=https://xfintern.onrender.com/`} target="_blank"><span className='share-comp'><FaFacebook /></span></a>
                        <a href={`https://linkedin.com/shareArticle/?summary=Checkout Xf Intern here &mini=true&url=https://xfintern.onrender.com/`} target="_blank"><span className='share-comp'><FaLinkedin /></span></a>
                        <span className="share-comp close" onClick={togglePopup}><ImCross /></span>
                    </div>
                    <h1 style={{
                        textAlign: "center",
                        fontSize: "1.25rem",
                        fontWeight: "550"
                    }}>Your Feedback & suggestion </h1>

                    <h2 style={{ textAlign: "center", fontWeight: "450", fontSize: "1.125rem" }}>Roast it (What are things are you <b>not liked</b>) and Please feedback </h2>
                    <form onSubmit={handleFeedbackSubmit}>
                        <textarea rows="1" style={{
                            width: "75%",
                            margin: "15px 0",
                        }} placeholder="Enter Your Title" name="title" className="textAreaFieldDifferent" />

                        <textarea rows="5" style={{
                            width: "75%",
                            margin: "15px 0"
                        }} placeholder="Your Suggestion , feedback, bug fixes , how i can improve it , what are things are you liked ❤️, What are things are you not liked and any other feedback ??"
                            name="feedback" className="textAreaFieldDifferent" />


                        <button type="submit" style={{ borderRadius: "24px", marginTop: "20px" }} className='btn_applied hover:scale-[1.05] transition-all duration-300 ease-out cursor-pointer' >Send Feedback 🙏🏼</button>
                    </form>
                </div>

            </div>}

        </>
    );
}

export default Navbar;