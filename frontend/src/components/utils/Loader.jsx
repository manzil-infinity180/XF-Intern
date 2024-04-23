// import { InfinitySpin } from 'react-loader-spinner'
import logo from './ele-final.png';
export const Loader = () => {
  return (
    <>
      <div style={{
        textAlign: "center", justifyContent: "center", display: "flex",
        margin: "10% 0",
        paddingBottom:"2%"
      }}
        className='fade-in-text'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="150px" height="150px" style={{
          position: "absolute",
          opacity: "0.85"
        }}>
          <radialGradient id="a11" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)"><stop offset="0" stopColor="#A485FF"></stop><stop offset=".3" stopColor="#A485FF" stopOpacity=".9"></stop><stop offset=".6" stopColor="#A485FF" stopOpacity=".6"></stop><stop offset=".8" stopColor="#A485FF" stopOpacity=".3"></stop><stop offset="1" stopColor="#A485FF" stopOpacity="0"></stop></radialGradient><circle transform-origin="center" fill="none" stroke="url(#a11)" strokeWidth="15" strokeLinecap="round" strokeDashoffset="200 1000" cx="100" cy="100" r="70"><animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform></circle><circle transformOrigin="center" fill="none" opacity=".2" stroke="#A485FF" strokeWidth="15" strokeLinecap="round" cx="100" cy="100" r="70"></circle></svg>
        <img src={logo} alt="" width="100px" height="100px" style={{
          position: "absolute",
          animation: "blink 1s linear infinite",
          margin: "30px 5px",
          opacity: "0.8"
        }}
          loading="lazy"
        />


      </div>
      <p style={{
        textAlign: "center"
      }}>I am Using Free-tier so it will takes upto <b>50 seconds</b> to load/fetch. Sorry 🥲</p>
    </>
  );
};

