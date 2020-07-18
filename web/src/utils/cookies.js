import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setCookie = (name, payload) => {
  if (!name || !payload) {
    return null;
  }

  cookies.set(name, payload, { path: '/' });

  return true;
};

export const getCookie = (name) => {
  if (!name) {
    return null;
  }

  return cookies.get(name);
};

export const removeCookie = (name) => {
  if (!name) {
    return null;
  }

  return cookies.remove(name, { path: '/' });
};
