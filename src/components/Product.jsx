import { useContext } from "react";
import { Link } from "react-router-dom";
// iconos
import { BsPlus, BsEyeFill } from "react-icons/bs";

export const Product = ({ product }) => {
  
  const { id, nombre, descripcion, precio, imagen } = product;

  // Encontrar el índice del primer punto en la descripción
  const primerPuntoIndex = descripcion.indexOf('.');

  // Obtener la descripción hasta el primer punto
  const descripcionHastaPrimerPunto = primerPuntoIndex !== -1 ? descripcion.substring(0, primerPuntoIndex + 1) : descripcion;

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
        <div className="font-semibold">$ {precio}</div>
         {/* Descripción hasta el primer punto */}
          <p className="mb-8" style={{ whiteSpace: 'pre-line' }}>
          {descripcionHastaPrimerPunto}
          </p>
      </div>
    </div>
  );
};
