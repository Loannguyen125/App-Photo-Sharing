/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url
 * @returns {Promise}
 */
async function fetchModel(url) {
  const BASE_URL = "https://8s5grd-8080.csb.app";

  try {
    const response = await fetch(BASE_URL + url);

    if (!response.ok) {
      throw new Error(`Fail to connect. Trạng thái: ${response.status}`);
    }

    const json = await response.json();

    return { data: json };
  } catch (error) {
    console.error("Fail in process fetchModel:", error);
    throw error;
  }
}

export default fetchModel;
