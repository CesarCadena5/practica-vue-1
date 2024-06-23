export const getDataApi = async (URL, params = {}) => {
    try {
        const resp = await fetch(URL, params);
        const json = await resp.json();

        return json;
    } catch (error) {
        throw new ('Error al obtener el dato');
    }
};