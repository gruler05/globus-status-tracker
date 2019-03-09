const getJsonData = async url => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.DATA;
  } catch (e) {
    console.error('Something happened while fetching the data', e);
  }
};

export default getJsonData;
