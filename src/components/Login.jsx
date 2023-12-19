import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authh, auth, GoogleAuthProvider, signInWithPopup } from "./firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(authh, new GoogleAuthProvider());
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>

      <section class="vh-100" >
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card shadow-2-strong" >
                <div class="card-body p-5 text-center">

                  <h3 class="mb-5">Sign in</h3>

                  <div class="form-outline mb-4">
                    <input type="email" id="typeEmailX-2" value={email} onChange={(e) => setEmail(e.target.value)} class="form-control form-control-lg" />
                    <label class="form-label" for="typeEmailX-2">Email</label>
                  </div>

                  <div class="form-outline mb-4">
                    <input type="password" id="typePasswordX-2" class="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label class="form-label" for="typePasswordX-2">Password</label>
                  </div>


                  <button class="btn btn-primary mt-3 btn-lg btn-block" type="submit" onClick={handleLogin}>Login</button><br />

                  <button class="btn btn-lg mt-3 btn-block btn-primary mb-2" onClick={handleGoogleLogin}> Sign in with google</button><br />
                  <p class="mb-0">Don't have an account? <Link to="/signup" class=" fw-bold">Sign Up</Link>
                  </p>


                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>

  );
}

export default Login;