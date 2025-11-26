// components/VideoPlayer/VideoPlayer.jsx
import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import VideoControls from "./VideoControls";
import "./VideoPlayer.css";

// TOPIC: Forwarding refs to custom components
const VideoPlayer = forwardRef(({ src, className }, ref) => {
  // TOPIC: Refs Basics - Connecting & Accessing DOM Elements
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // TOPIC: Refs vs State - State for rendering, refs for mutable values
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  // TOPIC: Using refs to store mutable values (beyond DOM access)
  const playbackRate = useRef(1.0);
  const lastVolume = useRef(1.0);

  // TOPIC: Exposing Component APIs with useImperativeHandle
  useImperativeHandle(ref, () => ({
    // DOM element access
    getVideoElement: () => videoRef.current,

    // Player control methods
    play: () => {
      videoRef.current?.play();
      setIsPlaying(true);
    },
    pause: () => {
      videoRef.current?.pause();
      setIsPlaying(false);
    },
    togglePlay: () => {
      if (isPlaying) {
        videoRef.current?.pause();
        setIsPlaying(false);
      } else {
        videoRef.current?.play();
        setIsPlaying(true);
      }
    },

    // TOPIC: Measuring elements with refs
    getVideoDimensions: () => {
      if (videoRef.current) {
        return {
          width: videoRef.current.videoWidth,
          height: videoRef.current.videoHeight,
          clientWidth: videoRef.current.clientWidth,
          clientHeight: videoRef.current.clientHeight,
        };
      }
      return null;
    },

    getCurrentTime: () => videoRef.current?.currentTime || 0,
    setCurrentTime: (time) => {
      if (videoRef.current) {
        videoRef.current.currentTime = time;
      }
    },

    // TOPIC: Manipulating DOM via refs
    enterFullscreen: () => {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    },

    setPlaybackRate: (rate) => {
      if (videoRef.current) {
        videoRef.current.playbackRate = rate;
        playbackRate.current = rate;
      }
    },
  }));

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleSeek = (percentage) => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      videoRef.current.currentTime = (percentage / 100) * duration;
    }
  };

  const toggleMute = () => {
    if (volume > 0) {
      lastVolume.current = volume;
      handleVolumeChange(0);
    } else {
      handleVolumeChange(lastVolume.current);
    }
  };

  /*
      cost of using useImarativehandle: not anysignificant but mental+structural complexity(react data flow)
        
        harder to debug

        harder to maintain

        harder to test

        harder for new devs to understand

        more imperative (jQuery-style)

        less React-like

      //its like a granade in our react app, it not meant to be used everywhere, 
      // its more like replacing every car engine with a rocket engine, it works but not meant for regular driving
  */

  return (
    <div ref={containerRef} className={`video-player ${className}`}>
      <video
        ref={videoRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        className="video-element"
      />

      <VideoControls
        isPlaying={isPlaying}
        progress={progress}
        volume={volume}
        onPlayPause={() => ref.current?.togglePlay()}
        onSeek={handleSeek}
        onVolumeChange={handleVolumeChange}
        onToggleMute={toggleMute}
        onEnterFullscreen={() => ref.current?.enterFullscreen()}
      />
    </div>
  );
});

VideoPlayer.displayName = "VideoPlayer";

export default VideoPlayer;
