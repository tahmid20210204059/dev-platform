import { Link, useNavigate } from "react-router-dom";

import {
  Code2,
  LogOut,
  User
} from "lucide-react";

import useAuth from "../../hooks/useAuth";


const Navbar = () => {


  const {
    user,
    logout
  } = useAuth();


  const navigate = useNavigate();



  const handleLogout = () => {

    logout();

    navigate("/login");

  };



  return (

    <nav className="navbar">


      <div className="nav-brand">

        <Code2 size={30}/>

        <span>
          DevPlatform
        </span>

      </div>




      <div className="nav-links">


        <Link to="/">
          Home
        </Link>



        <Link to="/create-post">
          Create Post
        </Link>




        {
          user &&

          <Link to="/profile">

            Profile

          </Link>

        }


      </div>




      <div className="nav-user">


        <User size={18}/>


        <span>
          {user?.name}
        </span>




        <button

          className="logout-btn"

          onClick={handleLogout}

        >

          <LogOut size={18}/>

          Logout


        </button>



      </div>



    </nav>

  );

};


export default Navbar;