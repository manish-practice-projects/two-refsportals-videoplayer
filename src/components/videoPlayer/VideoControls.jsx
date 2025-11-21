// components/VideoPlayer/VideoControls.jsx
import React, { useRef } from 'react'
import './VideoControls.css'

const VideoControls = ({
  isPlaying,
  progress,
  volume,
  onPlayPause,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onEnterFullscreen
}) => {
  // TOPIC: Refs for focus management
  const playButtonRef = useRef(null)
  const progressBarRef = useRef(null)

  const handleProgressClick = (e) => {
    // TOPIC: Measuring elements with refs
    const progressBar = progressBarRef.current
    if (progressBar) {
      const rect = progressBar.getBoundingClientRect()
      const percent = (e.clientX - rect.left) / rect.width
      onSeek(percent * 100)
    }
  }

  const handleKeyDown = (e) => {
    // TOPIC: Common use case - handling keyboard shortcuts
    if (e.target === progressBarRef.current) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        onSeek(Math.max(0, progress - 5))
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        onSeek(Math.min(100, progress + 5))
      }
    }
  }

  return (
    <div className="video-controls">
      <div className="controls-row">
        <button
          ref={playButtonRef}
          onClick={onPlayPause}
          className="control-btn"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>

        <div 
          ref={progressBarRef}
          className="progress-bar"
          onClick={handleProgressClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="slider"
          aria-label="Video progress"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="volume-controls">
          <button 
            onClick={onToggleMute}
            className="control-btn"
            aria-label={volume === 0 ? 'Unmute' : 'Mute'}
          >
            {volume === 0 ? '🔇' : volume > 0.5 ? '🔊' : '🔈'}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="volume-slider"
          />
        </div>

        <button 
          onClick={onEnterFullscreen}
          className="control-btn"
          aria-label="Enter fullscreen"
        >
          ⛶
        </button>
      </div>
    </div>
  )
}

export default VideoControls