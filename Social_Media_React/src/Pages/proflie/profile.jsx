import "./profile.scss";
import React, { useContext } from 'react';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import XIcon from '@mui/icons-material/X';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Posts from "../../component/posts/posts";
import Update from "../../component/update/update";
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Profile = () => {

    const[openUpdate, setOpenUpdate] = React.useState(false);
    const { currentUser } = useContext(AuthContext);
    const userId = parseInt(useLocation().pathname.split("/")[2]);

    const queryClient = useQueryClient();

    const { isLoading, error, data } = useQuery({
        queryKey: ['user', userId],
        queryFn: async () => {
            const res = await makeRequest.get("/users/find/" + userId);
            return res.data;
        }
    });

    const { isLoading: risLoading, data: relationshipData } = useQuery({
        queryKey: ['relationships', userId],
        queryFn: async () => {
            const res = await makeRequest.get("/relationship?followedUserId=" + userId);
            return res.data; // Ensure this line is present
        }
    });

    const mutation = useMutation({
        mutationFn: (following) => {
            if (following) return makeRequest.delete('/relationship?userId=' + userId);
            console.log('following:', userId);
            return makeRequest.post('/relationship', { userId });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["relationships"] });
        },
    });

    const handleFollow = async () => {
        mutation.mutate(relationshipData.includes(currentUser.id));
    }

    if (isLoading || risLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>No data available</div>;

    return (
        <div className="profile">
            <div className="images">
                <img src={"/upload/"+data.coverPic} alt="" className="cover" />
                <img src={"/upload/"+data.profilePic} alt="" className="profilePic" />
            </div>
            <div className="profilecontainer">
                <div className="uInfo">
                    <div className="left">
                        <a href="https://www.facebook.com/"><FacebookTwoToneIcon fontSize="large" /></a>
                        <a href="https://www.linkedin.com/"><LinkedInIcon fontSize="large" /></a>
                        <a href="https://www.instagram.com/"><InstagramIcon fontSize="large" /></a>
                        <a href="https://www.pinterest.com/"><PinterestIcon fontSize="large" /></a>
                        <a href="https://twitter.com/"><XIcon fontSize="large" /></a>
                    </div>
                    <div className="center">
                        <span>{data.name}</span>
                        <div className="info">
                            <div className="item">
                                <PlaceIcon />
                                <span>{data.city}</span>
                            </div>
                            <div className="item">
                                <LanguageIcon />
                                <span>{data.website}</span>
                            </div>
                        </div>
                        {userId === currentUser.id ? (
                            <button onClick={()=>setOpenUpdate(true)}>Update</button>
                        ) : (
                            <button onClick={handleFollow}>
                                {relationshipData && relationshipData.includes(currentUser.id) ? "Following" : "Follow"}
                            </button>
                        )}
                    </div>
                    <div className="right">
                        <EmailOutlinedIcon />
                        <MoreVertIcon />
                    </div>
                </div>
                <Posts userId={userId}/>
            </div>
            {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data}/>}
        </div>
    );
};

export default Profile;
