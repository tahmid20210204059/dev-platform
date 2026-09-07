import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";


import Profile from "../pages/Profile";

import PostDetail from "../pages/PostDetail";

import Login from "../pages/auth/Login";

import Register from "../pages/auth/Register";

import Home from "../pages/Home";

import CreatePost from "../components/post/CreatePost";


import useAuth from "../hooks/useAuth";



const ProtectedRoute = ({ children }) => {


  const {
    user,
    loading
  } = useAuth();



  if (loading) {

    return (

      <div>

        Loading...

      </div>

    );

  }



  if (!user) {

    return (

      <Navigate to="/login" />

    );

  }



  return children;

};





const AppRoutes = () => {


  return (

    <BrowserRouter>


      <Routes>



        <Route

          path="/login"

          element={<Login />}

        />




        <Route

          path="/register"

          element={<Register />}

        />





        <Route

          path="/"

          element={

            <ProtectedRoute>

              <Home />

            </ProtectedRoute>

          }

        />



        <Route

          path="/create-post"

          element={

            <ProtectedRoute>

              <CreatePost />

            </ProtectedRoute>

          }

        />





        <Route

          path="/profile"

          element={

            <ProtectedRoute>

              <Profile />

            </ProtectedRoute>

          }

        />





        <Route

          path="/post/:id"

          element={

            <ProtectedRoute>

              <PostDetail />

            </ProtectedRoute>

          }

        />





        <Route

          path="*"

          element={

            <Navigate to="/" />

          }

        />



      </Routes>



    </BrowserRouter>

  );

};



export default AppRoutes;