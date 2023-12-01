import { useContext } from "react";
import { Link } from "react-router-dom";
// iconos
import { BsPlus, BsEyeFill } from "react-icons/bs";
// context
//import { CartContext } from "../contexts/CartContext";

export const Product = ({ product }) => {
  // Desestructuración de product
  //const { addToCart } = useContext(CartContext);
  const { id, nombre, descripcion, precio, imagen } = product;

  return (
    <div>
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
          {/* imagen */}
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <img
              className="max-h-[160px] group-hover:scale-110 transition duration-300"
              src={imagen}
              alt={nombre}
            />
          </div>
          {/* Botones */}
          <div className="absolute top-6 -right-10 group-hover:right-1 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">

            <Link
              to={`/product/${id}`}
              className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
            >
              <BsEyeFill />
            </Link>
          </div>
        </div>
      </div>
      {/* descripcion, titulo y precio */}
      <div>
        <Link to={`/product/${id}`}>
          <h2 className="font-semibold mb-1">{nombre}</h2>
        </Link>
        <p className="text-gray-600">{descripcion}</p> {/* Agregado el campo de descripción */}
        <div className="font-semibold">$ {precio}</div>
      </div>
    </div>
  );
};
