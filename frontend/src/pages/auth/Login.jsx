import { useState } from "react";

import {
  Mail,
  Lock,
  Code2,
  Eye,
  EyeOff
} from "lucide-react";

import useAuth from "../../hooks/useAuth";

import {
  loginUser
} from "../../api/auth.api";

import {
  useNavigate
} from "react-router-dom";



const Login = () => {


  const {
    login
  } = useAuth();


  const navigate = useNavigate();



  const [showPassword,setShowPassword] = useState(false);



  const [form,setForm] = useState({

    email:"",
    password:""

  });



  const [error,setError] = useState("");




  const handleChange = (e)=>{


    setForm({

      ...form,

      [e.target.name]:
      e.target.value

    });


  };





  const handleSubmit = async(e)=>{


    e.preventDefault();


    try{


      const response =
        await loginUser(form);



      login({

        user:
        response.data.user,

        token:
        response.data.token

      });



      navigate("/");


    }
    catch(error){


      setError(

        error.response?.data?.message ||
        "Login failed"

      );


    }


  };





  return (

    <div className="auth-page">


      <div className="auth-card">



        <div className="brand">

          <Code2 size={38}/>

          <h1>
            DevPlatform
          </h1>

        </div>




        <h2>
          Welcome back
        </h2>



        <p>
          Login to continue your developer journey
        </p>





        {
          error &&

          <div className="error-box">

            {error}

          </div>

        }




        <form onSubmit={handleSubmit}>



          <div className="input-box">


            <Mail size={20}/>



            <input

              name="email"

              placeholder="Email address"

              value={form.email}

              onChange={handleChange}

              required

            />


          </div>





          <div className="input-box">


            <Lock size={20}/>



            <input

              type={
                showPassword
                ?
                "text"
                :
                "password"
              }

              name="password"

              placeholder="Password"

              value={form.password}

              onChange={handleChange}

              required

            />




            <span

              className="password-eye"

              onClick={()=>
                setShowPassword(!showPassword)
              }

            >

              {
                showPassword

                ?

                <EyeOff size={20}/>

                :

                <Eye size={20}/>

              }


            </span>



          </div>





          <button>

            Login

          </button>



        </form>





        <div className="switch">


          Don't have an account?


          <span

            onClick={()=>
              navigate("/register")
            }

          >

            Register

          </span>


        </div>




      </div>


    </div>

  );

};


export default Login;