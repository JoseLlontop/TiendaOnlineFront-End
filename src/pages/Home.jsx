import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { Hero, Product } from "../components";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const Home = () => {

  const { products } = useContext(ProductContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [personaData, setPersonaData] = useState(null);

  const URL = import.meta.env.VITE_API_URL;

  //Parameto del renaper que recibimos en la URL
  const obtenerParametroDeURL = () => {
    const params = new URLSearchParams(location.search);
    return params.get('queryParametro');
  };

  // Recuperar el tipo de usuario almacenado en localStorage
  const tipoUsuario = localStorage.getItem('tipoUsuario');

  //Realizamos después de que el componente ha sido renderizado
  useEffect(() => {

    const parametro = obtenerParametroDeURL();

    const parametrosSolicitud = {
      parametroUsuario: parametro,
      tipoIngresoSistema: tipoUsuario
    };

    console.log(parametrosSolicitud);

    // Llamar a una de mis apis
    fetch(`${URL}/api/retornarDatos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(parametrosSolicitud)
    })

    .then(response => response.json())
    .then(datosPersona => {

      console.log(datosPersona);

      setPersonaData(datosPersona); // Almacenar los datos de la persona en el estado

      console.log(personaData)

      if (datosPersona.tipo === "proveedor") {
        navigate("/gestionProductos");
      }

      if (datosPersona.tipo === "cliente") {
        navigate("/FormularioVenta");
      }

    })
    //Error de la api
    .catch(error => {
      console.error("Error al llamar a la API de obtener datos del usuario: ", error);
    });
    
  }, [location.search]);

  return (
    <>
      <Hero />
      <section className="py-16">
        <div className="container mx-auto">
          <h1 className="uppercase mb-6 font-bold text-2xl">
            Nuestros Productos más vendidos
          </h1>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 max-w-sm mx-auto md:max-w-none md:mx-0">
            {products.map((product) => (
              <Product product={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};