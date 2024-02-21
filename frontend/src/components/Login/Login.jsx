import LoginRegisterUtil from '../utils/LoginRegisterUtil';
import './Login.css'

function Login() {
    return (
        <>
         <LoginRegisterUtil title={"Login"} description={" If you do not have any account yet, click on register yourself"}
         type={"Login"} second={"Register"} path={'/register'} />
        </>
    );
}

export default Login;