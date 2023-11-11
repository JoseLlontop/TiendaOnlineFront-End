export const fetchData = async (URL) => {
  try {
    const response = await fetch(URL)
    //Transaformamos a un JSON
    const data = await response.json()
    return{
        data,
        isLoding: false
    }
  } catch (e) {
    console.error(e)
  }
}