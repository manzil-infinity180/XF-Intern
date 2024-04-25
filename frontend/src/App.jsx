import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query";
import { Login } from "./components/Login/Login"
import Home from "./components/Home/Home"
import Register from "./components/Register/Register"
import { Toaster } from "react-hot-toast"
import { queryclient } from "./components/utils/http";
import Verify from "./components/Login/Verify";
import List from "./components/List/List";
import { AdminPost } from "./components/ADMIN/AdminPost";
import { AdminAllPost } from "./components/ADMIN/AdminAllPost";
import { UpdatePost } from "./components/ADMIN/UpdatePost";
import { JobApplyPanel } from "./components/USER/JobApplyPanel";
import { CompanyDetailsAndOpening } from "./components/USER/CompanyDetailsAndOpening";
import { UpdateAdmin } from "./components/ADMIN/UpdateAdmin";
import { WhoApplied } from "./components/ADMIN/WhoApplied";
import { UserDetailsPreview } from "./components/USER/UserDetailsPreview";
import { UserDetailsAndUpdate } from "./components/USER/UserDetailsAndUpdate";
import { Bookmark } from "./components/USER/Bookmark";

function App() {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    }, {
      path: "*",
      element: <Home />
    }, {
      path: '/verify',
      element: <Verify />

    },
    {
      path: "/list",
      element: <List />
    }, {
      path: '/admin/post',
      element: <AdminPost />
    }, {
      path: '/admin/allpost',
      element: <AdminAllPost />
    }, {
      path: '/admin/update/:id',
      element: <UpdatePost />
    }
    // ,{
    //   path:'/user/job',
    //   element:<JobApplyPanel />
    // }
    , {
      path: '/admin/:adminId',
      element: <CompanyDetailsAndOpening />
    }, {
      path: '/admin/profile/edits',
      element: <UpdateAdmin />
    }, {
      path: "/admin/stats/:postId",
      element: <WhoApplied />
    },
    // {
    //   path:'/user/profile/:id',
    //   element:<UserDetailsPreview />
    // },
    {
      path: '/user/profile/edits',
      element: <UserDetailsAndUpdate />
    }, {
      path: '/user/bookmark',
      element: <Bookmark />
    }
  ]);

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
