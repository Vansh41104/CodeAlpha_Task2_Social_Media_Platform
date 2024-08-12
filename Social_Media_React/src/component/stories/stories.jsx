import "./stories.scss"
import React, { useContext } from 'react';
import { AuthContext } from "../../context/authContext";

const Stories = () => {

    const {currentUser} = useContext(AuthContext);
    const stories = [
        {
            id:1,
            name:"Jason",
            img:"https://images.pexels.com/photos/27008964/pexels-photo-27008964/free-photo-of-a-tree-is-sitting-on-the-shore-of-a-lake.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        },
        {
            id:2,
            name:"Jason",
            img:"https://images.pexels.com/photos/27008964/pexels-photo-27008964/free-photo-of-a-tree-is-sitting-on-the-shore-of-a-lake.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        },
        {
            id:3,
            name:"Jason",
            img:"https://images.pexels.com/photos/27008964/pexels-photo-27008964/free-photo-of-a-tree-is-sitting-on-the-shore-of-a-lake.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        },
        {
            id:4,
            name:"Jason",
            img:"https://images.pexels.com/photos/27008964/pexels-photo-27008964/free-photo-of-a-tree-is-sitting-on-the-shore-of-a-lake.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        },
        {
            id:5,
            name:"Jason",
            img:"https://images.pexels.com/photos/27008964/pexels-photo-27008964/free-photo-of-a-tree-is-sitting-on-the-shore-of-a-lake.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        },
    ]
    return (
        <div>
            <div className="stories">
                <div className="story">
                        <img src={"/upload/"+currentUser.profilePic} alt="" />
                        <span>{currentUser.name}</span>
                        <button>+</button>
                    </div>
                {stories.map((story) => (
                    <div className="story" key={story.id}>
                        <img src={story.img} alt="" />
                        <span>{story.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Stories;