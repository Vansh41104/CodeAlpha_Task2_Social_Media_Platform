import "./home.scss";
import Stories from "../../component/stories/stories";
import Posts from "../../component/posts/posts";
import Share from "../../component/share/share"
import React from 'react';

const Home = () => {
    return (
        <div className="home"> 
            <Stories />
            <Share />
            <Posts />
        </div>
    );
}
export default Home;