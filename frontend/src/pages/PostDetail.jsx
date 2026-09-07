import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../api/post.api";
import {
    getComments,
    createComment,
    replyComment
} from "../api/comment.api";
import {
    getCommentReactionCounts,
    toggleCommentReaction
} from "../api/reaction.api";
import { API_BASE_URL } from "../api/axios";
import { formatTimeAgo } from "../utils/time";

const getErrorMessage = (error, fallback) =>
    error.response?.data?.message || fallback;

const CommentItem = ({ comment, onReplyCreated }) => {
    const [replyBody, setReplyBody] = useState("");
    const [replyOpen, setReplyOpen] = useState(false);
    const [replySubmitting, setReplySubmitting] = useState(false);
    const [replyError, setReplyError] = useState("");
    const [reactionCounts, setReactionCounts] = useState({
        likes: 0,
        dislikes: 0
    });
    const [reactionError, setReactionError] = useState("");

    useEffect(() => {
        let active = true;

        getCommentReactionCounts(comment.id)
            .then(response => {
                if (active) {
                    setReactionCounts(response.data);
                }
            })
            .catch(error => {
                if (active) {
                    setReactionError(
                        error.response?.data?.message ||
                        "Unable to load comment reactions."
                    );
                }
            });

        return () => {
            active = false;
        };
    }, [comment.id]);

    const handleReaction = async type => {
        setReactionError("");

        try {
            await toggleCommentReaction({
                commentId: comment.id,
                type
            });

            const response = await getCommentReactionCounts(comment.id);
            setReactionCounts(response.data);
        } catch (error) {
            setReactionError(
                error.response?.data?.message ||
                "Unable to update comment reaction."
            );
        }
    };

    const handleReply = async event => {
        event.preventDefault();
        const body = replyBody.trim();

        if (!body || replySubmitting) {
            return;
        }

        setReplySubmitting(true);
        setReplyError("");

        try {
            await replyComment(comment.id, body);
            setReplyBody("");
            setReplyOpen(false);
            await onReplyCreated();
        } catch (error) {
            setReplyError(
                error.response?.data?.message ||
                "Unable to create reply."
            );
        } finally {
            setReplySubmitting(false);
        }
    };

    return (
        <div className="comment-card">
            <strong>{comment.author_name}</strong>
            <p>{comment.body}</p>
            <time dateTime={comment.created_at}>
                {formatTimeAgo(comment.created_at)}
            </time>

            <div>
                <button
                    type="button"
                    onClick={() => handleReaction("like")}
                >
                    Like {reactionCounts.likes}
                </button>
                <button
                    type="button"
                    onClick={() => handleReaction("dislike")}
                >
                    Dislike {reactionCounts.dislikes}
                </button>
                {reactionError && <span role="alert">{reactionError}</span>}
            </div>

            <button
                type="button"
                onClick={() => setReplyOpen(value => !value)}
            >
                {replyOpen ? "Cancel" : "Reply"}
            </button>

            {replyOpen && (
                <form className="reply-box" onSubmit={handleReply}>
                    <textarea
                        value={replyBody}
                        onChange={event => setReplyBody(event.target.value)}
                        placeholder="Write a reply"
                        disabled={replySubmitting}
                    />
                    <button
                        type="submit"
                        disabled={replySubmitting || !replyBody.trim()}
                    >
                        {replySubmitting ? "Posting..." : "Reply"}
                    </button>
                    {replyError && <p role="alert">{replyError}</p>}
                </form>
            )}

            {comment.replies?.map(reply => (
                <CommentItem
                    key={reply.id}
                    comment={reply}
                    onReplyCreated={onReplyCreated}
                />
            ))}
        </div>
    );
};

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [commentsLoading, setCommentsLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [commentsError, setCommentsError] = useState("");
    const [submitError, setSubmitError] = useState("");

    const loadComments = async () => {
        setCommentsLoading(true);
        setCommentsError("");

        try {
            const commentResponse = await getComments(id);
            setComments(commentResponse.data || []);
        } catch (requestError) {
            setComments([]);
            setCommentsError(
                getErrorMessage(requestError, "Unable to load comments.")
            );
        } finally {
            setCommentsLoading(false);
        }
    };

    useEffect(() => {
        const loadPost = async () => {
            setLoading(true);
            setError("");

            try {
                const postResponse = await getPost(id);
                setPost(postResponse.data);
            } catch (requestError) {
                setError(
                    getErrorMessage(requestError, "Unable to load this post.")
                );
            } finally {
                setLoading(false);
            }
        };

        const loadInitialComments = async () => {
            setCommentsLoading(true);
            setCommentsError("");

            try {
                const commentResponse = await getComments(id);
                setComments(commentResponse.data || []);
            } catch (requestError) {
                setComments([]);
                setCommentsError(
                    getErrorMessage(requestError, "Unable to load comments.")
                );
            } finally {
                setCommentsLoading(false);
            }
        };

        loadPost();
        loadInitialComments();
    }, [id]);

    const handleComment = async event => {
        event.preventDefault();
        const body = comment.trim();

        if (!body || submitting) {
            return;
        }

        setSubmitting(true);
        setSubmitError("");

        try {
            await createComment(id, body);
            setComment("");
            await loadComments();
        } catch (requestError) {
            setSubmitError(
                getErrorMessage(requestError, "Unable to create comment.")
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (!post) {
        return <div>{loading ? "Loading..." : error}</div>;
    }

    return (
        <div className="post-detail-page">
            <div className="post-detail-card">
                <h1>{post.title}</h1>
                <p>{post.body}</p>
                {post.media_url && post.media_type === "video" && (
                    <video
                        className="post-video"
                        src={`${API_BASE_URL}${post.media_url}`}
                        controls
                    />
                )}
                {post.media_url && post.media_type === "image" && (
                    <img
                        className="post-image"
                        src={`${API_BASE_URL}${post.media_url}`}
                        alt="post"
                    />
                )}
                <span>By {post.author_name}</span>
            </div>

            <div className="comment-section">
                <h2>Comments</h2>

                <form onSubmit={handleComment}>
                    <textarea
                        value={comment}
                        onChange={event => setComment(event.target.value)}
                        placeholder="Write a comment"
                        disabled={submitting}
                    />
                    <button
                        type="submit"
                        disabled={submitting || !comment.trim()}
                    >
                        {submitting ? "Posting..." : "Comment"}
                    </button>
                </form>

                {submitError && <p role="alert">{submitError}</p>}
                {commentsLoading && <p>Loading comments...</p>}
                {!commentsLoading && commentsError && (
                    <p role="alert">{commentsError}</p>
                )}
                {!commentsLoading && !commentsError && comments.length === 0 && (
                    <p>No comments yet. Be the first to comment.</p>
                )}
                {!commentsLoading && !commentsError && comments.map(commentItem => (
                    <CommentItem
                        key={commentItem.id}
                        comment={commentItem}
                        onReplyCreated={loadComments}
                    />
                ))}
            </div>
        </div>
    );
};

export default PostDetail;
