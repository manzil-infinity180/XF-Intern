import LoginRegisterUtil from '../utils/LoginRegisterUtil';
function Register() {
    return (
        <>
         <LoginRegisterUtil title={"Register Yourself"} description={" If you do not have any account yet, click on register yourself"}
         type={"Register"} second={"Login"} path={'/login'} />
        </>
    );
}

export default Register;