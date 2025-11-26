// App.jsx
import React, { useState, useRef } from 'react'
import VideoPlayer from './components/VideoPlayer/VideoPlayer'
import Modal from './components/Modal/Modal'
import CustomInput from './components/CustomInput/CustomInput'
import Tooltip from './components/Tooltip/Tooltip'
import './App.css'

function App() {
  const [showModal, setShowModal] = useState(false)
  const [videoUrl, setVideoUrl] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')
  const videoPlayerRef = useRef(null)

  // TOPIC: Refs for storing mutable values (not for rendering)
  const appRenderCount = useRef(0)
  appRenderCount.current++

  const handleShowPlayerAPI = () => {
    if (videoPlayerRef.current) {
      // TOPIC: Exposing component APIs with useImperativeHandle
      console.log('Player API:', videoPlayerRef.current)
      alert(`Current time: ${videoPlayerRef.current.getCurrentTime().toFixed(2)}s`)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Video Player Demo</h1>
        <p>Demonstrating Refs, Portals, and Advanced React Concepts</p>
        <small>App renders: {appRenderCount.current}</small>
      </header>

      <div className="app-controls">
        <button 
          onClick={() => setShowModal(true)}
          className="btn btn-primary"
        >
          Show Video Settings
        </button>
        
        <button 
          onClick={handleShowPlayerAPI}
          className="btn btn-secondary"
        >
          Get Player Info
        </button>

        {/* TOPIC: Forwarding refs to custom components */}
        <CustomInput 
          placeholder="Enter custom video URL..."
          onEnter={(value) => setVideoUrl(value)}
        />
      </div>

      <VideoPlayer 
        ref={videoPlayerRef}
        src={videoUrl}
        className="main-video-player"
      />

      {/* TOPIC: Tooltip with portal */}
      <Tooltip text="This video player demonstrates React refs and portals">
        <button className="info-btn">ℹ️ Hover for info</button>
      </Tooltip>

      {/* TOPIC: Modal with portal */}
      <Modal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Video Settings"
      >
        <div className="modal-content">
          <h3>Video Configuration</h3>
          <p>This modal is rendered using React Portal!</p>
          <div className="video-options">
            <label>
              <input type="radio" name="video" defaultChecked />
              Big Buck Bunny
            </label>
            <label>
              <input type="radio" name="video" />
              Elephants Dream
            </label>
            <label>
              <input type="radio" name="video" />
              Sintel
            </label>
          </div>
          <button 
            onClick={() => setShowModal(false)}
            className="btn btn-primary"
          >
            Apply Settings
          </button>
        </div>
      </Modal>

      <div className="concepts-demo">
        <h2>React Concepts Demonstrated</h2>
        <ul>
          <li>✅ Refs Basics - DOM element access & manipulation</li>
          <li>✅ Advanced Ref Usage - Mutable values, forwarding refs</li>
          <li>✅ useImperativeHandle - Component APIs</li>
          <li>✅ Portals - Modals and tooltips</li>
          <li>✅ Custom hooks with refs</li>
        </ul>
      </div>
    </div>
  )
}

export default App