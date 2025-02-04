import React from "react";
import { useNavigate, useNavigation } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  return (
    <section className="bg-custom-light-grey flex items-center justify-center min-h-screen">
      <div className="bg-white p-10 rounded-xl flex flex-col gap-10">
        <img
          loading="lazy"
          alt="Logo de IntheairLabs"
          className="w-[200px] mx-auto"
          src="/src/assets/intheairlabs_couleur.png"
        />
        <div className="flex flex-col gap-6">
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
            onClick={() => navigate("/projects")}
            className="btn-primary w-full"
          >
            Me connecter
          </button>
        </div>
      </div>
    </section>
  );
}
