import { useState } from "react";

import {
  createPost
} from "../../api/post.api";


const CreatePost = ({ onCreated }) => {


  const [form,setForm] = useState({

    title:"",
    body:""

  });


  const [media,setMedia] = useState(null);

  const [loading,setLoading] = useState(false);

  const [error,setError] = useState("");



  const handleChange = (e)=>{

    setForm({

      ...form,

      [e.target.name]:e.target.value

    });

  };



  const handleSubmit = async(e)=>{

    e.preventDefault();


    const data = new FormData();


    data.append(
      "title",
      form.title
    );


    data.append(
      "body",
      form.body
    );


    if(media){

      data.append(
        "media",
        media
      );

    }



    try{


      setLoading(true);
      setError("");


      await createPost(data);



      setForm({

        title:"",
        body:""

      });


      setMedia(null);


      onCreated?.();



    }
    catch(error){

      setError(
        error.response?.data?.message ||
        "Unable to create post."
      );
    }
    finally{

      setLoading(false);

    }


  };



  return (

    <div className="create-post-card">


      <h2>
        Create Post
      </h2>

      {
        error &&
        <p role="alert">
          {error}
        </p>
      }



      <form onSubmit={handleSubmit}>


        <input

          name="title"

          placeholder="Post title"

          value={form.title}

          onChange={handleChange}

          required

        />



        <textarea

          name="body"

          placeholder="Share your thoughts..."

          value={form.body}

          onChange={handleChange}

          required

        />



        <input

          type="file"

          accept="image/*,video/*"

          onChange={(e)=>setMedia(e.target.files[0])}

        />



        <button disabled={loading}>

          {
            loading
            ?
            "Posting..."
            :
            "Create Post"
          }

        </button>


      </form>


    </div>

  );

};


export default CreatePost;