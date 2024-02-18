import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { Hero, Product } from "../components";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Home = () => {

  const { products } = useContext(ProductContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [personaData, setPersonaData] = useState(null);

  const CLIENTE_ID = "BNFI-DFDF-DFDF-DF45";
  const CLIENTE_SECRET = "miContraseña";

  const textoIncriptado = "";

  //Parameto del renaper que recibimos en la URL
  const obtenerParametroDeURL = () => {
    const params = new URLSearchParams(location.search);
    return params.get('parametro');
  };

  //Realizamos después de que el componente ha sido renderizado
  useEffect(() => {

    //VERIFICACION

    // Llamar a una de mis apis
    fetch("http://localhost:8080/api/desencriptarJwt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        textoIncriptado
      })
    })
    .then(response => response.json())
    .then(datoDesencriptados => {

      setPersonaData(datoDesencriptados); // Almacenar los datos de la persona en el estado
      console.log(datoDesencriptados)
      console.log(datoDesencriptados.tipo)
    
    })
    .catch(error => {
       console.error("Error al llamar a la API de desencriptar: ", error);
    });



    const parametro = obtenerParametroDeURL();

    if (parametro != null) {
      // Llamar a la API que nos provee el Renaper
      fetch("api/Auth/loguearJWT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          CLIENTE_ID,
          CLIENTE_SECRET,
          parametro
        })
      })

      .then(response => response.json())
      .then(data => {

        // Verificar si la llamada fue exitosa y decodificar el JWT
        if (data.exito) {

          const textoIncriptado = data.datos;

          // Llamar a una de mis apis
          fetch("http://localhost:8080/api/desencriptarJwt", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              textoIncriptado
            })
          })

          .then(response => response.json())
          .then(datoDesencriptados => {

            setPersonaData(datoDesencriptados); // Almacenar los datos de la persona en el estado

            if (datoDesencriptados.tipo === "proveedor") {
              navigate("/gestionProductos");
            }

            if (datoDesencriptados.tipo === "cliente") {
              navigate("/agregar-ruta-para-cliente");
            }

          })
          //Error de mi api
          .catch(error => {
            console.error("Error al llamar a la API de desencriptar: ", error);
          });

        }})
        //Error de la api del Renaper
      .catch(error => {
        console.error("Error al llamar a la API del Renaper: ", error);
      });
    }
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