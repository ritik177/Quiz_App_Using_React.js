import React, { useState, useEffect } from "react";
import "./App.css";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { DataProvider } from "./context/dataContext";

function App() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [violationCount, setViolationCount] = useState(0);

  useEffect(() => {
    // Retrieve stored violation count
    // const storedViolationCount = localStorage.getItem("violationCount");
    // if (storedViolationCount) {
    //   setViolationCount(parseInt(storedViolationCount));
    // }
    // Retrieve fullscreen state
    const storedFullScreen = localStorage.getItem("isFullScreen");
    setIsFullScreen(storedFullScreen === "true");

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    // Store violation count in localStorage
    localStorage.setItem("violationCount", violationCount.toString());
  }, [violationCount]);

  useEffect(() => {
    // Store fullscreen state in localStorage
    localStorage.setItem("isFullScreen", isFullScreen.toString());
  }, [isFullScreen]);

  const handleFullScreenChange = () => {
    setIsFullScreen(document.fullscreenElement !== null);
  };

  const handleVisibilityChange = () => {
    if (!document.hidden) {
      // setViolationCount(violationCount + 1);
      setViolationCount((prevCount) => prevCount + 1);
    }
  };

  const requestFullScreen = () => {
    const appContainer = document.documentElement;
    if (appContainer.requestFullscreen) {
      appContainer.requestFullscreen();
    }
  };

  const startQuiz = () => {
    if (!isFullScreen) {
      alert("Please take the test in full-screen mode.");
      return;
    }
    // setViolationCount(0);
  };

  return (
    <DataProvider>
      {violationCount > 0 && (
        <div className="violation-message">
          <p>You've violated the test conditions {violationCount} times.</p>
        </div>
      )}
      {!isFullScreen && (
        <div className="full-screen-blocker">
          <p>Please take the test in full-screen mode.</p>
          <button onClick={requestFullScreen}>Enter Full Screen</button>
        </div>
      )}
      <Start startQuiz={startQuiz} />

      <Quiz />

      <Result />
    </DataProvider>
  );
}

export default App;
