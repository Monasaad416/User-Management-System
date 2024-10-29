import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MasterLayout from './Components/MasterLayout/MasterLayout.tsx'
import NotFound from './Components/NotFound/NotFound.tsx'
import Users from './Components/Users/Users.tsx'
import UserForm from './Components/UserForm/UserForm.tsx'
import Home from './Components/Home/Home.tsx'
import UserProfile from './Components/UserProfile/UserProfile.tsx'
import Login from './Components/Login/Login.tsx'
import AuthLayout from './Components/AuthLayout/AuthLayout.tsx'
import { ToastContainer } from 'react-toastify';

function App() {
  const router = createBrowserRouter([
    {
       path:"",
       element: <AuthLayout/>,
       errorElement:<NotFound/>,
       children: [
        { index: true, element: <Login/> },
        { path: "login", element: <Login/> },
       ],
    },
    {
       path:"dashboard",
       element: <MasterLayout/>,
       errorElement:<NotFound/>,
       children: [
        { index: true, element: <Home/> },
        { path: "home", element: <Home/>},
        { path: "users", element: <Users/> },
        { path: "users/add-user", element: <UserForm/> },
        { path: "users/update-user/:userId", element: <UserForm/> },
        { path: "users/user-profile", element: <UserProfile/> },
       ],
    }
   

  ])

  return (
    <>

      <RouterProvider router={ router }></RouterProvider>
      <ToastContainer />
    </>
  )
}

export default App
