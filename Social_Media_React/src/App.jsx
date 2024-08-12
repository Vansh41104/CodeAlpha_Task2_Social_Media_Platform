import React from "react"
import Login from "./Pages/login/login"
import Register from "./Pages/register/register"
import Home from "./Pages/home/home"
import Profile from "./Pages/proflie/profile"
import { createBrowserRouter,RouterProvider,Route,Outlet,Navigate} from "react-router-dom"
import Navbar from "./component/navbar/navbar"
import Leftbar from "./component/leftbar/leftbar"
import Rightbar from "./component/rightbar/rightbar"
import "./style.scss"
import { useContext } from "react"
import { DarkModeContext } from "./context/darkModeContext"
import { AuthContext } from "./context/authContext"
import {QueryClient,QueryClientProvider,} from '@tanstack/react-query'

function App() {

  const {currentUser} = useContext(AuthContext);

  const {darkMode} = useContext(DarkModeContext);

  const queryClient = new QueryClient();

  const Layout = ()=>{
    return(
      <QueryClientProvider client={queryClient}>  
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Navbar/>
          <div style={{display:"flex"}}>
            <Leftbar/>
            <div style={{flex:6}}>
              <Outlet/>
            </div>
            <Rightbar/>
          </div>
        </div>
      </QueryClientProvider>
    )
  }

  const ProtectedRoute = ({children})=>{
    if(!currentUser){
      return <Navigate to="/login"/>
    }
    return children;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element:  <ProtectedRoute><Layout/></ProtectedRoute>,
      children:[
        {
          path: "/",
          element: <Home/>
        },
        {
          path: "/profile/:id",
          element: <Profile/>
        }
        
      ]
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/register",
      element: <Register/>
    },
  ]);

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
