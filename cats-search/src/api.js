const API_ENDPOINT =
  'https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev';

const request = async (url) => {
  try {
    const res = await fetch(url);
    switch (res.status) {
      case 200:
        return res.json();
      case 500:
        throw new Error('internal server error!');
      case 400:
        throw new Error('bad request!');
      default:
        throw new Error('error!');
    }
  } catch (e) {
    throw e;
  }
};

export const api = {
  fetchCats: (keyword) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
  },
  fetchCat: (id) => {
    return request(`${API_ENDPOINT}/api/cats/${id}`);
  },
  fetchRandomCats: () => {
    return request(`${API_ENDPOINT}/api/cats/random50`);
  },
};
