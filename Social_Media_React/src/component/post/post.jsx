// Post.jsx
import "./post.scss";
import React, { useContext } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from 'react-router-dom';
import Comments from '../comments/comments';
import moment from 'moment';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
    const [commentOpen, setCommentOpen] = React.useState(false);
    const [menuOpen, setMenuOpen] = React.useState(false);

    const { currentUser } = useContext(AuthContext);
    const queryClient = useQueryClient();

    // Fetch likes data
    const { isLoading, error, data } = useQuery({
        queryKey: ['likes', post.id],
        queryFn: async () => {
            const res = await makeRequest.get(`/likes?postId=${post.id}`);
            return res.data;
        },
    });

    // Mutation for liking/unliking a post
    const mutation = useMutation({
        mutationFn: async (liked) => {
            if (liked) {
                return makeRequest.delete(`/likes?postId=${post.id}`);
            } else {
                console.log('Posting like for postId:', post.id);
                return makeRequest.post('/likes', { postId: post.id });
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['likes']);
        },
    });

    // Mutation for deleting a post
    const deleteMutation = useMutation({
        mutationFn: async (postId) => {
            console.log('Deleting post with id:', postId);
            return makeRequest.delete(`/posts/`+postId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['posts']);
        },
    });

    const handleLike = async () => {
        mutation.mutate(data.includes(currentUser.id));
    };

    const handleDelete = () => {
        deleteMutation.mutate(post.id);
      };;
    
    

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading likes</div>;
    }

    return (
        <div className="post">
          <div className="container">
            <div className="user">
              <div className="userInfo">
                <img src={"/upload/"+post.profilePic} alt="" />
                <div className="details">
                  <Link
                    to={`/profile/${post.userId}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <span className="name">{post.name}</span>
                  </Link>
                  <span className="date">{moment(post.createdAt).fromNow()}</span>
                </div>
              </div>
              <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
              {menuOpen && post.userId === currentUser.id && (
                <button onClick={handleDelete}>delete</button>
              )}
            </div>
            <div className="content">
              <p>{post.description}</p>
              <img src={"/upload/" + post.img} alt="" />
            </div>
            <div className="info">
              <div className="item">
                {isLoading ? (
                  "loading"
                ) : data.includes(currentUser.id) ? (
                  <FavoriteOutlinedIcon
                    style={{ color: "red" }}
                    onClick={handleLike}
                  />
                ) : (
                  <FavoriteBorderIcon onClick={handleLike} />
                )}
                {data?.length} Likes
              </div>
              <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                <TextsmsOutlinedIcon />
                See Comments
              </div>
              <div className="item">
                <ShareOutlinedIcon />
                Share
              </div>
            </div>
            {commentOpen && <Comments postId={post.id} />}
          </div>
        </div>
      );
    };

export default Post;
