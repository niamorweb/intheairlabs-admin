import {
  Building,
  LogOut,
  NotebookText,
  Plus,
  User,
  Users,
  UserCog,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Définir les éléments de navigation avec l'icône Plus là où c'est nécessaire
const navItems = [
  {
    label: "Clients",
    icon: <Users className="size-4" />,
    links: [
      { text: "Liste des clients", href: "/clients" },
      {
        text: "Ajouter un client",
        href: "/clients/create",
        icon: <Plus className="size-4" />,
      }, // Icône Plus ajoutée ici
    ],
  },
  {
    label: "Projets",
    icon: <NotebookText className="size-4" />,
    links: [
      { text: "Liste des projets", href: "/projects" },
      {
        text: "Ajouter un projet",
        href: "/projects/create",
        icon: <Plus className="size-4" />,
      }, // Icône Plus ajoutée ici
      {
        text: "Ajouter un nouveau type",
        href: "/projects/types/create",
        icon: <Plus className="size-4" />,
      }, // Icône Plus ajoutée ici
    ],
  },
  {
    label: "Entreprises",
    icon: <Building className="size-4" />,
    links: [
      { text: "Liste des entreprises", href: "/companies" },
      {
        text: "Ajouter une entreprise",
        href: "/companies/create",
        icon: <Plus className="size-4" />,
      }, // Icône Plus ajoutée ici
      {
        text: "Ajouter un secteur",
        href: "/companies/sector/create",
        icon: <Plus className="size-4" />,
      }, // Icône Plus ajoutée ici
    ],
  },
  // {
  //   label: "Paramètres",
  //   icon: <User className="size-4" />,
  //   links: [
  //     { text: "Mon compte", href: "/account" },
  //     {
  //       text: "Gérer les utilisateurs",
  //       href: "/users",
  //       icon: <UserCog className="size-4" />,
  //     },
  //   ],
  // },
];

function Layout({ children }) {
  return (
    <div className="flex items-start h-full">
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
        {/* <button className="bg-custom-very-light-grey duration-150 rounded-full p-2 w-full text-custom-secondary text-sm flex items-center gap-3 justify-center ">
          <LogOut className="size-4" />
          Me déconnecter
        </button> */}
      </div>
      <div className="w-full flex flex-col">
        <div className="hidden py-2 w-full flex items-center justify-between px-10 border-b border-b-custom-light-grey">
          <div className="flex items-center gap-3">
            <a
              href=""
              className="flex items-center gap-2 text-sm hover:bg-custom-very-light-grey p-3 duration-150 cursor-pointer rounded-md"
            >
              <User className="size-4" />
              Mon compte
            </a>
            <a
              href=""
              className="flex items-center gap-2 text-sm hover:bg-custom-very-light-grey p-3 duration-150 cursor-pointer rounded-md"
            >
              <UserCog className="size-4" />
              Gérer les utilisateurs
            </a>
          </div>
          <button className="text-custom-black flex items-center gap-3 text-sm text-custom-secondary hover:bg-custom-secondary-very-low-opacity p-3 duration-150 cursor-pointer rounded-md">
            {" "}
            <LogOut className="size-4 text-custom-black text-custom-secondary" />{" "}
            Me déconnecter
          </button>
        </div>
        <div className="p-12 gap-10 ">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
