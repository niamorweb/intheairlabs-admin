import { useNavigate, useNavigation } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
// import { useAuth } from "./context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  // const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn, login } = useAuth();

  const handleLogin = () => {
    // const userData = { email };
    // login(userData);

    axios
      .post(
        "https://dummyjson.com/auth/login",
        {
          username: "emilys",
          password: "emilyspass",
          expiresInMins: 30, // optionnel, par défaut 60
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // setAuthUser(response.data);
        // setIsLoggedIn(true);
        console.log(response.data);
        login(response.data);
        navigate("/projects");
      })
      .catch((error) => {
        console.error("Erreur de connexion:", error);
      });
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
