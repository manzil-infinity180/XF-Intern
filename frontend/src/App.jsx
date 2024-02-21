import {createBrowserRouter,RouterProvider} from  "react-router-dom"
import LoginPage from "./components/Login/Login"
import Home from "./components/Home/Home"
import Register from "./components/Register/Register"
import Navbar from "./components/Navbar/Navbar"
import {Toaster} from "react-hot-toast"
import Profile from "./components/Profile/Profile"
import Step3 from "./components/Profile/Step3"
function App() {
  const router = createBrowserRouter([

    {
      path:'/',
      element :<Navbar />,
      errorElement : <h1> Something went Wrong</h1>,
    },
    {
      path:'/login',
      element : <LoginPage />
    },
    {
      path:'/register',
      element : <Register />
    },{
      path:"*",
      element:<h1>Hello</h1>
    },{
      path:'/home',
      element : <Home />
    },{
      path:"/profile",
      element:<Profile />
    },{
      path:"/step3",
      element:<Step3 />
    }
  ])

  return (
    <>
    <RouterProvider router={router} />
    <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              backgroundColor: "white",
              color: "green",
              border: "1px solid green",
              padding: "15px",
              marginRight: "20px",
            },
            iconTheme: {
              primary: "green",
              secondary: "white",
            },
          },
          error: {
            style: {
              backgroundColor: "white",
              color: "red",
              border: "1px solid red",
              padding: "15px",
              marginRight: "20px",
            },
            iconTheme: {
              primary: "red",
              secondary: "white",
            },
          },
        }}
      />
    </>
  )
}

export default App
