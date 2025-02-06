import React from "react";

export default function Sidebar() {
  return (
    <div className="bg-custom-primary sticky top-0 p-10 flex flex-col justify-between text-white h-screen">
      <div className="flex flex-col gap-6">
        <img
          loading="lazy"
          alt="Logo de IntheairLabs"
          className="w-[200px]"
          src="/src/assets/intheairlabs_blanc.png"
        />
        <div className="flex flex-col">
          {navItems.map((section, index) => (
            <div
              key={index}
              className={`flex flex-col gap-3 border-b-1 border-b-custom-white/50 py-5  ${
                index === 2 && "border-none"
              }`}
            >
              <span className="uppercase text-xs">{section.label}</span>
              <div className="flex flex-col flex-no-wrap">
                {section.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.href}
                    className="flex items-center gap-2 text-sm whitespace-nowrap hover:bg-white/10 p-3 rounded-md duration-150"
                  >
                    {link.icon || section.icon}{" "}
                    {/* Utiliser l'icône spécifique pour chaque lien */}
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
