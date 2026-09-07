import {
  useEffect,
  useState
} from "react";


import useAuth from "../hooks/useAuth";


import {
  getProfile,
  createProfile,
  updateProfile
} from "../api/profile.api";



const Profile = () => {


  const {
    user
  } = useAuth();



  const [profile,setProfile] = useState(null);

  const [loading,setLoading] = useState(true);

  const [error,setError] = useState("");



  const [form,setForm] = useState({

    bio:"",
    skills:"",
    experiences:""

  });





  const loadProfile = async()=>{


    try{

      setError("");


      const response =
        await getProfile(user.id);



      setProfile(
        response.data
      );



      setForm({

        bio:
        response.data.bio || "",



        skills:
        response.data.skills?.join(", ") || "",



        experiences:
        response.data.experiences?.join(", ") || ""

      });



    }
    catch(error){


      setProfile(null);

      if(error.response?.status !== 404){

        setError(
          error.response?.data?.message ||
          "Unable to load profile."
        );

      }


    }
    finally{


      setLoading(false);


    }


  };







  useEffect(()=>{


    if(user){

      const loadInitialProfile = async()=>{

        try{

          setError("");

          const response =
            await getProfile(user.id);

          setProfile(
            response.data
          );

          setForm({
            bio:
            response.data.bio || "",
            skills:
            response.data.skills?.join(", ") || "",
            experiences:
            response.data.experiences?.join(", ") || ""
          });

        }
        catch(error){

          setProfile(null);

          if(error.response?.status !== 404){

            setError(
              error.response?.data?.message ||
              "Unable to load profile."
            );

          }

        }
        finally{

          setLoading(false);

        }

      };

      loadInitialProfile();

    }


  },[user]);









  const handleChange=(e)=>{


    setForm({

      ...form,

      [e.target.name]:
      e.target.value

    });


  };









  const handleSubmit=async(e)=>{


    e.preventDefault();




    const payload={


      bio:
      form.bio,



      skills:

      form.skills

      .split(",")

      .map(item=>item.trim())

      .filter(Boolean),




      experiences:

      form.experiences

      .split(",")

      .map(item=>item.trim())

      .filter(Boolean)



    };






    try{

      setError("");


      if(profile){


        await updateProfile(
          payload
        );


      }
      else{


        await createProfile(
          payload
        );


      }



      await loadProfile();



    }
    catch(error){


      setError(
        error.response?.data?.message ||
        "Unable to save profile."
      );


    }


  };







  if(loading){


    return (

      <div>

        Loading profile...

      </div>

    );


  }







  return (



    <div className="profile-page">



      <div className="profile-card">



        <h1>

          My Profile

        </h1>

        {
          error &&
          <p role="alert">
            {error}
          </p>
        }






        {
          profile &&

          <div className="profile-info">


            <h2>

              {user?.name}

            </h2>


            <p>

              {user?.email}

            </p>


          </div>

        }





        <form onSubmit={handleSubmit}>




          <textarea

            name="bio"

            value={form.bio}

            placeholder="Your bio"

            onChange={handleChange}

          />






          <input

            name="skills"

            value={form.skills}

            placeholder="Skills: Node.js, React"

            onChange={handleChange}

          />







          <input

            name="experiences"

            value={form.experiences}

            placeholder="Experience"

            onChange={handleChange}

          />







          <button type="submit">


            {
              profile

              ?

              "Update Profile"

              :

              "Create Profile"

            }


          </button>




        </form>




      </div>



    </div>



  );

};



export default Profile;