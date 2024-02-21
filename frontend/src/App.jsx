import {createBrowserRouter,RouterProvider} from  "react-router-dom"
import {QueryClientProvider} from "@tanstack/react-query";
import LoginPage from "./components/Login/Login"
import Home from "./components/Home/Home"
import Register from "./components/Register/Register"
import Navbar from "./components/Navbar/Navbar"
import {Toaster} from "react-hot-toast"
import Profile from "./components/Profile/Profile"
import Step3 from "./components/Profile/Step3"
import { queryclient } from "./components/utils/http";
import Verify from "./components/Login/Verify";
import { UploadImages } from "./components/UploadImg/UploadImg";
import List from "./components/List/List";
function App() {
  const router = createBrowserRouter([
    {
      path:'/login',
      element : <LoginPage />
    },
    {
      path:'/register',
      element : <Register />
    },{
      path:"*",
      element:<Home />
    },{
      path:"/profile",
      element:<Profile />
    },{
      path:'/verify',
      element:<Verify />

    },{
      path:'/step2',
      element:<UploadImages />
    },
    {
      path:"/step3",
      element:<Step3 />
    },{
      path:"/list",
      element:<List/>
    }
  ])

  return (
    <>
    <QueryClientProvider client={queryclient}>
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
      </QueryClientProvider>
    </>
  )
}

export default App
