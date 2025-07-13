import "./Loader.css"

function Loader({ isVisible }) {
  return (
    <div className={`loader-container ${!isVisible ? "fade-out" : ""}`}>
      {/* Floating Particles */}
      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      {/* Main Loader */}
      <div className="loader-text">PowerFit Gym</div>

      <div className="loader">
        <div className="loader-ring"></div>
        <div className="loader-ring"></div>
        <div className="loader-ring"></div>
        <div className="loader-center"></div>
      </div>

      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar"></div>
      </div>

      <div className="loading-status">Preparing your fitness journey...</div>
    </div>
  )
}

export default Loader