import { useNavigate, useNavigation } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
// import { useAuth } from "./context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { getAnUser } from "../../api/usersApi";
import { authLogin } from "../../api/authentification";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn, login } = useAuth();

  // if user already authenticated => go to projects page
  if (authUser) {
    navigate("/projects");
  }

  const handleLogin = async () => {
    const data = {
      email: email,
      password: password,
    };

    // Login request
    const loginResponse = await authLogin(data);

    console.log("loginResponse  :: : :", loginResponse);

    // Decode the access_token
    const decodedAccessToken = jwtDecode(loginResponse.access_token);

    console.log("decoded access token  :: : :", decodedAccessToken);

    // Fetch the current user
    const getUserResponse = await getAnUser(decodedAccessToken.user_id);

    console.log("getUserResponse ::: ", getUserResponse);

    const dataToStore = {
      access_token: loginResponse.access_token,
      user: getUserResponse,
    };

    login(dataToStore);
  };

  return (
    <section className="bg-custom-light-grey flex items-center justify-center min-h-screen">
      <div className="bg-white p-10 rounded-xl flex flex-col gap-10">
        <img
          loading="lazy"
          alt="Logo de IntheairLabs"
          className="w-[200px] mx-auto"
          src="/src/assets/intheairlabs_couleur.png"
        />
        <div className="flex flex-col gap-8">
          <h2 className="text-2xl font-semibold">
            Connectez-vous à votre compte
          </h2>
          <div className="flex flex-col gap-3">
            <div>
              <label htmlFor="">Adresse E-mail</label>
              <input
                type="email"
                className="input"
                placeholder="Entrez votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="">Mot de passe</label>
              <input
                type="password"
                className="input"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={() => handleLogin()}
            className="btn-primary mt-2 w-full"
          >
            Me connecter
          </button>
        </div>
      </div>
    </section>
  );
}
