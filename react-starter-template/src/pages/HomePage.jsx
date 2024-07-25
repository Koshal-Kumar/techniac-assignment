import React from "react";
import Header from "../Components/Header";
import Quiz from "./QuizPage";

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    
    <div>
      <div className="header-wrapper">
        <Header  />
      </div>
      <div className="body-wrapper" style={{ width: "100%" }}>
        <div className="body-background-wrapper">
          <img
            src="153685422_626f4775-3aec-427d-b099-016eaaa82613.jpg"
            alt="bg-img"
          />
        </div>
        <div className="body-container" style={{ width: "100%", maxHeight: "100%" }}>
          <div className="page-width">
            <div className="body-box">
              <div className="quiz-wrapper">
                <Quiz disabled={!user?.token} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    
  
   
  );
};

export default HomePage;
