import { Link, useLocation } from "react-router-dom";

//BARRA DE NAVEGACION
export const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <nav className="flex items-center gap-3 font-medium text-primary">
      <Link
        className={`${
          pathname === "/" && "text-red-600"
        } hover:text-red-600 transition`}
        to={"/"}
      >Inicio
      </Link>

      <Link
        className={`${
          pathname === "/about" && "text-red-600"
        } hover:text-red-600 transition`}
        to={"/about"}
      >Nosotros
      </Link>

      <Link
        className={`${
          pathname === "/products" && "text-red-600"
        } hover:text-red-600 transition`}
        to={"/products"}
      >Productos
      </Link>

      <Link
        className={`${
          pathname === "/adminProducts" && "text-red-600"
        } hover:text-red-600 transition`}
        to={"/adminProducts"}
      >Publicar
      </Link>

      <Link
        className={`${
          pathname === "/contact" && "text-red-600"
        } hover:text-red-600 transition`}
        to={"/contact"}
      >Contáctanos
      </Link>

    </nav>
  );
};
