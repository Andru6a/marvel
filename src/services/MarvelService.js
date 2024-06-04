import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=64e87f61f8b009b9b44a4206749f6d05";
  const _baseOffset = 220;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getCharacterByName = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  }

  const _transformCharacter = (char) => {
    if(!char) {
      const error = 'The character was not found. Check the name and try again'
      return error;
    }
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 210)}...`
        : "There is no description for this character",
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  const getAllComics = async (offset = _baseOffset) => {
    const res = await request(`
    ${_apiBase}/comics?limit=8&offset=${offset}&${_apiKey}
    `);
    return res.data.results.map(_transformComics);
  };

  const getComic = async (id) => {
    const res = await request(`
    ${_apiBase}/comics/${id}?${_apiKey}
    `);
    return _transformComics(res.data.results[0]);
  };

  const _transformComics = (item) => {
    return {
      id: item.id,
      title: item.title,
      thumbnail: item.thumbnail.path + "." + item.thumbnail.extension,
      price: item.prices[0].price
        ? `${item.prices[0].price}$`
        : `not available`,
      description: item.description || "There is no description",
      pageCount: item.pageCount
        ? `${item.pageCount} p.`
        : "No information about the number of pages",
      language: item.textObjects[0]?.language || "en-us",
    };
  };

  return {
    loading,
    error,
    getAllCharacters,
    getCharacter,
    clearError,
    getAllComics,
    getComic,
    getCharacterByName,
  };
};

export default useMarvelService;
