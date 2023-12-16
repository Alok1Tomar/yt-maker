import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [videoId, setVideoId] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchVideo = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=AIzaSyA3tIRZVlMdv5sXy_irGQfLLGjEhYh-3J8`
      );
      
      const title = response.data.items[0].snippet.title;
      setVideoTitle(title);
      setErrorMessage('');
    } catch (error) {
      setVideoTitle('');
      setErrorMessage('Video not found or API request failed.');
      console.error('Error fetching video:', error);
    }
  };

  const handleInputChange = (event) => {
    setVideoId(event.target.value);
  };

  return (
    <div className="flex-col items-center text-center justify-center text-bold">
    <div >
      <h1  className='text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-none'>Fetch Youtube Vidio </h1>
      <div className=' flex flex-row py-9  px-5 justify-center text-lg  space-x-5'>
        <input  className='outline outline-offset-2 outline-1 rounded-sm'
          type="text"
          placeholder="Enter YouTube Video ID "
          value={videoId}
          onChange={handleInputChange}
        />
        <button onClick={fetchVideo} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Fetch Video</button>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {videoTitle && (
        <div  className='  relative flex flex-col py-4 justify-center text-lg '>
          <h2>{videoTitle}</h2>
          <div className="aspect-video  ">
          <iframe  className=" h-full w-full rounded-lg"
            title="YouTube Video"
            width="100"
            height="100"
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default App;
