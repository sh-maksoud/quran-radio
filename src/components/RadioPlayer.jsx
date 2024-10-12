


import { useRef, useEffect } from 'react';

const RadioPlayer = () => {
  const streamUrl1 = 'http://mediaserver2.islamicity.com:8000/SaudiTVArabic'; // Saudi Quran Radio
  const streamUrl2 = 'https://stream.radiojar.com/4wqre23fytzuv'; // Live Saudi Quran Radio
  const streamUrl3 = 'https://stream.radiojar.com/8s5u5tpdtwzuv'; // إذاعة القرآن الكريم المصرية

  // Refs to access the audio elements
  const audioRef1 = useRef(null);
  const audioRef2 = useRef(null);
  const audioRef3 = useRef(null);
  const playerRef = useRef(null); // Reference to YouTube player

  // Load YouTube IFrame API
  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag); // Append the script to the body

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '315',
        width: '100%',
        videoId: 'AqGLjVjbkZ0', // Replace with your desired video ID
        playerVars: { autoplay: 0, mute: 1 }, // Do not autoplay, mute by default
        events: {
          onReady: (event) => {
            // Optionally handle player ready
          },
          onError: (event) => {
            console.error('YouTube Player Error:', event.data);
          },
        },
      });
    };

    // Cleanup function to remove the script tag
    return () => {
      const scriptTag = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
      if (scriptTag) {
        scriptTag.remove();
      }
    };
  }, []);

  const handlePlayAudio = (audioRefToPlay, audioRefsToPause) => {
    // Pause all other audio elements
    audioRefsToPause.forEach(ref => {
      if (ref.current) {
        ref.current.pause();
        ref.current.currentTime = 0; // Optional: Reset time
      }
    });

    // Play the selected audio
    if (audioRefToPlay.current) {
      audioRefToPlay.current.play();
    }

    // Pause video if playing
    if (playerRef.current) {
      playerRef.current.pauseVideo(); // Pause YouTube video
    }
  };

  const handlePlayVideo = () => {
    // Pause all audio elements
    [audioRef1, audioRef2, audioRef3].forEach(ref => {
      if (ref.current) {
        ref.current.pause();
        ref.current.currentTime = 0; // Optional: Reset time
      }
    });

    // Play video
    if (playerRef.current) {
      playerRef.current.playVideo();
    }
  };

  return (
    <div className="radio-player">
      <h2>Live Stream of Quran Radio</h2>
      
      {/* Saudi Quran Radio Player */}
      <div>
        <h3>قناة السعوديه قران كريم مباشر</h3>
        <audio
          ref={audioRef1}
          controls
          style={{ width: '100%', marginTop: '10px' }}
          onPlay={() => handlePlayAudio(audioRef1, [audioRef2, audioRef3])} // Handle play event
        >
          <source src={streamUrl1} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>

      {/* Live Saudi Quran Radio Player */}
      <div>
        <h3>قناة القرآن الكريم السعودية مباشر</h3>
        <audio
          ref={audioRef2}
          controls
          style={{ width: '100%', marginTop: '10px' }}
          onPlay={() => handlePlayAudio(audioRef2, [audioRef1, audioRef3])} // Handle play event
        >
          <source src={streamUrl2} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>

      {/* Egyptian Quran Radio Player */}
      <div>
        <h3>إذاعة القرآن الكريم المصرية</h3>
        <audio
          ref={audioRef3}
          controls
          style={{ width: '100%', marginTop: '10px' }}
          onPlay={() => handlePlayAudio(audioRef3, [audioRef1, audioRef2])} // Handle play event
        >
          <source src={streamUrl3} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>

      {/* YouTube Live Video Player */}
      <div>
        <h3>بث مباشر الحرم النبوي</h3>
        <div id="youtube-player" style={{ marginTop: '10px' }}></div>
        <button onClick={handlePlayVideo} style={{ marginTop: '10px' }}>Play Video</button>
      </div>
    </div>
  );
};

export default RadioPlayer;
