import React from "react";
import { useState } from "react";
import "./LoginScreen.css";
import SingIn from "../SingInScreen/SingIn";

function LoginScreen() {
  const [ signIn ,setSignIN] = useState(false)
  return (
    <div className="homeScreen1">
      <div className="homeScreen_background">
        <img
          className="homeScreen_logo"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt=""
        />
        <button className="homeScreen_button" onClick={() =>setSignIN(true)}>Sign In</button>
        <div className="homeScreen_gradient"></div>
      </div>
      <div className="homeScreen_body">
        
        {signIn?(
          <SingIn />
        ):(
          <>
          <h1>Unlimited movies, TV shows and more.</h1>
          <h2>Watch anywhere. Cancel anytime.</h2>
          <h3>
            Ready to watch? Enter your email to create or restart your
            membership.
          </h3>
          <div className="homeScreen_input">
          
    
              <form>
              <input type="email" placeholder="Email address" />
              <button type="submit" className="homeScreen_input_button" onClick={() =>setSignIN(true)}>
                GET STARTED
              </button>
            </form>
            
          
            
          </div>
          </>
        )}
          
      </div>
    </div>
  );
}

export default LoginScreen;
