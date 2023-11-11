import { useEffect, useState } from "react"
import { fetchData } from "../helpers/fetchData"

export const useFetchData = (URL) => {

  //Estado o datos del componente que van a afectar a otros componentes y va a ser renderizada:
  const [data, setData] = useState([])
  const [isLoding, setIsLoding] = useState(true)

  //Al cargar el componente solo se ejecuta una sola vez:
  useEffect(() => {
    //La fetchData es asincrono y retorna una promesa
    fetchData(URL).then( respuesta => {
      setData(respuesta.data)
      //Una vez que se cargar los usuarios termina el isLoding:
      setIsLoding(respuesta.isLoding)
    })
  }, [])

  return {
    data,
    //Para que espere a que se termine de hacer el fetch y que retorne que ya no se esta cargando mas 
    isLoding
  }
}
