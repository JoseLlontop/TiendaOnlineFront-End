import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;

  li {
    padding: 18px 10px;
    border-bottom: 2px solid #f1f1f1;
    // Estilo para el color del texto
    a {
      color: black;
    }
  }

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #3949AB;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
  }
`;

const RightNav = ({ open }) => {
    const location = useLocation();
    const { pathname } = location;
  return (
    <Ul open={open}>
      <li>
        <Link
            className={`${
            pathname === "/" && "text-red-600"
            } hover:text-red-600 transition`}
            to={"/"}
        >Inicio
        </Link>
      </li>
        <li>
            <Link className={`${
                pathname === "/about" && "text-red-600"
                } hover:text-red-600 transition`}
                to={"/about"}
            >Nosotros
            </Link>
        </li>
      <li>      
        <Link
            className={`${
            pathname === "/products" && "text-red-600"
            } hover:text-red-600 transition`}
            to={"/products"}
        >Productos
        </Link>
      </li>    

      <li>
        <Link
            className={`${
            pathname === "/iniciarSesion" && "text-red-600"
            } hover:text-red-600 transition`}
            to={"/iniciarSesion"}
        >Gestionar Productos
        </Link>
      </li>
      <li>
        <Link
            className={`${
            pathname === "/Registrarse" && "text-red-600"
            } hover:text-red-600 transition`}
            to={"/Registrarse"}
        >Registrarse
        </Link>
      </li>

      <li>
        <Link
            className={`${
            pathname === "/contact" && "text-red-600"
            } hover:text-red-600 transition`}
            to={"/contact"}
        >Contáctanos
        </Link>
      </li>
    </Ul>
  )
}

export default RightNav
