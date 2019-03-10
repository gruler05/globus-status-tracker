const getJsonData = async url => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (e) {
    // Todo: Use better logger here for detailed error handing like pino or bunyan
    console.error('Something happened while fetching the data', e);
  }
};

export default getJsonData;
