import {
  useEffect,
  useState
} from "react";


import {
  useNavigate
} from "react-router-dom";


import {
  Heart,
  ThumbsDown,
  MessageCircle
} from "lucide-react";


import {
  toggleReaction,
  getReactionCounts
} from "../../api/reaction.api";

import {
  API_BASE_URL
} from "../../api/axios";



const PostCard = ({ post }) => {


  const navigate = useNavigate();



  const [counts,setCounts] = useState({

    likes: post.likes || 0,

    dislikes: post.dislikes || 0

  });

  const [reactionError,setReactionError] = useState("");




  const loadCounts = async()=>{


    try{

      setReactionError("");


      const result =
        await getReactionCounts(post.id);



      setCounts(
        result.data
      );


    }
    catch(error){

      setReactionError(
        error.response?.data?.message ||
        "Unable to load reactions."
      );

    }


  };





  useEffect(()=>{

    let active = true;

    getReactionCounts(post.id)
      .then(result => {
        if (active) {
          setCounts(result.data);
        }
      })
      .catch(error => {
        if (active) {
          setReactionError(
            error.response?.data?.message ||
            "Unable to load reactions."
          );
        }
      });

    return () => {
      active = false;
    };

  },[post.id]);






  const handleReaction = async(type)=>{


    try{

      setReactionError("");


      await toggleReaction({

        postId:post.id,

        type

      });



      loadCounts();



    }
    catch(error){

      setReactionError(
        error.response?.data?.message ||
        "Unable to update reaction."
      );

    }


  };







  return (


    <div className="post-card">





      <div

        className="post-header"

        onClick={()=>
          navigate(`/post/${post.id}`)
        }

        style={{
          cursor:"pointer"
        }}

      >


        <h3>

          {post.title}

        </h3>



        <span>

          By {post.author_name}

        </span>


      </div>





      <p>

        {post.body}

      </p>






      {
        post.media_url && (
          post.media_type === "video" ?

          <video

            className="post-video"

            src={`${API_BASE_URL}${post.media_url}`}

            controls

          />

          :

          <img

            className="post-image"

            src={`${API_BASE_URL}${post.media_url}`}

            alt="post"

          />
        )
      }






      <div className="post-actions">

        {
          reactionError &&
          <span role="alert">
            {reactionError}
          </span>
        }



        <button

          onClick={()=>
            handleReaction("like")
          }

        >

          <Heart size={18}/>

          {counts.likes}

        </button>





        <button

          onClick={()=>
            handleReaction("dislike")
          }

        >

          <ThumbsDown size={18}/>

          {counts.dislikes}

        </button>





        <button

          onClick={()=>
            navigate(`/post/${post.id}`)
          }

        >

          <MessageCircle size={18}/>

          {post.comment_count || 0}

        </button>



      </div>




    </div>


  );

};



export default PostCard;