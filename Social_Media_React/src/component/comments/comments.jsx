import "./comments.scss"
import React, { useContext } from 'react';
import { AuthContext } from "../../context/authContext";
import { useQuery,useQueryClient, useMutation} from '@tanstack/react-query';
import { makeRequest } from "../../axios";
import moment from "moment";


const Comments = ({postId}) => {

    const [description,setDescrioption ] = React.useState("")
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newComment) => makeRequest.post('/comments', newComment),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['comments'] });
        },
    });

    const handleClick = async (e) => {
        e.preventDefault();
        mutation.mutate({ description, postId });
        setDescrioption("");
    }

    const { isLoading, error, data } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const res = await makeRequest.get("/comments?postId="+postId);
            return res.data;
        }
    });
    if (error) return <div>An error occurred: {error.message}</div>;
        console.log(data); 

    const {currentUser} = useContext(AuthContext);


    return (
        <div className="comments">
            <div className="write">
                <img src={currentUser.profilePic} alt="" />
                <input type="text" placeholder="Write a comment" onChange={e=>setDescrioption(e.target.value)} value={description}/>
                <button onClick={handleClick}>Send</button>
            </div>
            {isLoading ? "loading":data.map(comment=>(
                <div className="comment" key={comment.id}>
                    <img src={comment.profilePic} alt="" />
                    <div className="info">
                        <span>{comment.name}</span>
                        <p>{comment.description}</p>
                    </div>
                    <span className="date">{moment(comment.createdAt).fromNow()}</span>
                </div>
            ))}
        </div>
    );
}
export default Comments;