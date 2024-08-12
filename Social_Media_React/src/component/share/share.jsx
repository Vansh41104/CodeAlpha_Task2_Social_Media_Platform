import "./share.scss";
import Image from "../../assets/14.png";
import Map from "../../assets/15.png";
import Friend from "../../assets/1.png";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import React from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { makeRequest } from "../../axios";

const Share = () => {
  const [file, setFile] = React.useState(null);
  const [description, setDescription] = React.useState("");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newPost) => makeRequest.post('/posts', newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      console.error("Error posting data: ", error.response ? error.response.data : error.message);
    },
  });
  
  const handleClick = async (e) => {
    e.preventDefault();
    let imageUrl = "";
    if (file) {
      imageUrl = await upload();
    }
    const newPost = { description, img: imageUrl };
    console.log("newPost data: ", newPost); // Added console log
    mutation.mutate(newPost);
    setDescription("");
    setFile(null);
  };

  const { currentUser } = useContext(AuthContext);
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img
              src={"/upload/"+currentUser.profilePic}
              alt=""
            />
            <input type="text" placeholder={`What's on your mind ${currentUser.name}?`} onChange={e => setDescription(e.target.value)} value={description} />
          </div>
          <div className="right">
            {file && <img src={URL.createObjectURL(file)} alt="" className="file" />}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
