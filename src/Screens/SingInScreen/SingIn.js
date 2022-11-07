import React from "react";
import { useRef } from "react";
import { auth } from "../../Firebase";
import "./SingIn.css";
function SingIn() {

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) =>{
    e.preventDefault();
    auth.createUserWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value
    ).then((authUser) =>{
      console.log(authUser);
    }).catch(error =>{
      alert(error.message)
    })

  }

  const signIn = (e) =>{
    e.preventDefault();
    auth.signInWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value
    ).then((authUser) =>{
      console.log(authUser);
    }).catch(error =>{
      alert(error.message)
    })
  }
  return (
    
    <div className="singupScreen">

      <form>
        <h1>Sign In</h1>
        <input type="email" placeholder="Email" ref={emailRef}/>
        <input type="password" placeholder="Password" ref={passwordRef}/>
        <button type="submit" onClick={signIn}>Sign In</button>

        <h4>
          <span className="singupScreen_gray">New to Netflix?</span> <span className="singupScreen_link" onClick={register}>Sign Up Now</span>
        </h4>
      </form>
    </div>
  );
}

export default SingIn;
