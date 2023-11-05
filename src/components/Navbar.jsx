import { Link, useLocation } from "react-router-dom";
import Burger from "./Burger";


//BARRA DE NAVEGACION
export const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
      
        <nav className="flex items-center gap-3 font-medium text-primary">
          <Burger/>{/*Menu desplegable para pantalas pequeñas*/}
          </nav>
  );
};
