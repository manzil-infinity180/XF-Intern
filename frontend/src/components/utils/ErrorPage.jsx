import { Link } from 'react-router-dom';
import logo from './men-loader.png';
export function ErrorPage({ message, selector }) {

    return (
        <>
            <div className="flex items-center my-10 flex-col justify-center ">
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr"
                }}>
                    <div>
                        <img src={logo} alt="oops-image" width="400px" loading="lazy" />
                    </div>
                    <div style={{
                        marginTop: "150px"
                    }}>
                        <h1 className="text-center text-4xl font-bold tracking-wider"
                        >{message}</h1>
                        <h1 className="text-center text-2xl tracking-wider"
                        >{selector.error}</h1>
                    </div>

                    <Link to={'/'}><button style={{ borderRadius: "24px", margin: "10px 75px" }}
                        className='btn_clickable text-center hover:scale-[1.05] transition-all duration-300 ease-out cursor-pointer'
                    >
                        Go to HomePage</button>
                    </Link>
                </div>
            </div>
        </>
    );
}

