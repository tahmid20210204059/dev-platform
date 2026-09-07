import { useEffect, useState } from "react";

import Navbar from "../components/common/Navbar";

import PostCard from "../components/post/PostCard";

import {
  getPosts
} from "../api/post.api";



const Home = () => {


  const [posts,setPosts] = useState([]);

  const [loading,setLoading] = useState(true);

  const [retry,setRetry] = useState(0);

  const [error,setError] = useState("");



  useEffect(()=>{


    const loadPosts = async()=>{


      try{

        setLoading(true);
        setError("");


        const result =
          await getPosts();


        setPosts(
          result.data
        );


      }
      catch(error){

        setPosts([]);

        setError(
          error.response?.data?.message ||
          "Unable to load posts."
        );

      }
      finally{

        setLoading(false);

      }


    };


    loadPosts();


  },[retry]);





  return (

    <>


      <Navbar />





      <div className="feed-page">

        <h1>
          Latest Developer Posts
        </h1>



        {
          error ?

          <div>

            <p role="alert">
              {error}
            </p>

            <button
              type="button"
              onClick={() => setRetry(value => value + 1)}
            >
              Retry
            </button>

          </div>

          :

          loading ?


          <p>
            Loading posts...
          </p>



          :



          posts.length === 0 ?


          <p>
            No posts available
          </p>



          :



          posts.map(
            (post)=>(

              <PostCard

                key={post.id}

                post={post}

              />

            )
          )


        }



      </div>



    </>

  );

};


export default Home;