import { useState } from "react";
import { Mail, Lock, User, Code2 } from "lucide-react";
import { registerUser } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";


const Register = () => {


  const navigate = useNavigate();



  const [form,setForm] = useState({

    name:"",
    email:"",
    password:""

  });


  const [error,setError] = useState("");



  const handleChange=(e)=>{

    setForm({

      ...form,

      [e.target.name]:e.target.value

    });

  };



  const handleSubmit=async(e)=>{

    e.preventDefault();


    try{

      await registerUser(form);

      navigate("/login");

    }
    catch(error){

      setError(
        error.response?.data?.message ||
        "Registration failed"
      );

    }

  };



  return (

    <div className="auth-page">


      <div className="auth-card">


        <div className="brand">

          <Code2 size={38}/>

          <h1>
            DevSpace
          </h1>

        </div>



        <h2>
          Create account
        </h2>


        <p>
          Join developers and share knowledge
        </p>



        {
          error &&
          <div className="error-box">
            {error}
          </div>
        }



        <form onSubmit={handleSubmit}>


          <div className="input-box">

            <User size={20}/>

            <input

              name="name"

              placeholder="Full name"

              value={form.name}

              onChange={handleChange}

              required

            />

          </div>




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

              type="password"

              name="password"

              placeholder="Password"

              value={form.password}

              onChange={handleChange}

              required

            />

          </div>




          <button>

            Create account

          </button>



        </form>



        <div className="switch">

          Already have account?

          <span onClick={()=>navigate("/login")}>

            Login

          </span>


        </div>



      </div>



    </div>

  );

};


export default Register;