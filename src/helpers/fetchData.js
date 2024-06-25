export const fetchData = async (URL) => {
  try {
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    });

    // Transformamos a un JSON
    const data = await response.json();
    return {
      data,
      isLoding: false
    };
  } catch (e) {
    console.error(e);
    return {
      data: [],
      isLoding: false
    };
  }
};
