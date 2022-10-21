import NodeRSA from 'node-rsa';
import axios from 'axios';

const public_key = 'private';

const private_key = 'private';

export const API = axios.create({
  baseURL: 'https://api.gccworkers.app/',
});

export const login = (user) => {
  try {
    if (user && user.token && user.token !== '') {
      API.defaults.headers.common['authorization'] = user.token;
      const key = new NodeRSA(public_key);
      const encrypted = key.encrypt(JSON.stringify(user), 'base64');
      localStorage.setItem('@gulf-worker-uni/auth-key', encrypted);
      localStorage.setItem('@gulf-worker-uni/name', user.name);
      localStorage.setItem('@gulf-worker-uni/image', user.image);

      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};

export const isAuthenticated = () => {
  try {
    let encrypted = localStorage.getItem('@gulf-worker-uni/auth-key');
    if (encrypted) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};

export const getUserType = () => {
  try {
    let encrypted = localStorage.getItem('@gulf-worker-uni/auth-key');
    if (encrypted) {
      const key = new NodeRSA(private_key);
      const user = key.decrypt(encrypted, 'utf8');
      if (user && user.token && user.token !== '') {
        return user.userType;
      }
    }
    return false;
  } catch (err) {
    return false;
  }
};

export const getToken = () => {
  try {
    let encrypted = localStorage.getItem('@gulf-worker-uni/auth-key');

    if (encrypted) {
      const key = new NodeRSA(private_key);
      const user = key.decrypt(encrypted, 'utf8');

      const parsedUser = JSON.parse(user);
      if (parsedUser?.token !== '') {
        return parsedUser.token;
      }
    }
    return false;
  } catch (err) {
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem('@gulf-worker-uni/auth-key');
  localStorage.removeItem('@gulf-worker-uni/name');
  localStorage.removeItem('@gulf-worker-uni/image');
  window.location.href = '/login';
};

export const i18nextLng = () => {
  let lang = localStorage.getItem('i18nextLng') || 'ar';
  return lang;
};

export const headerSetup = async (setSession) => {
  try {
    const token = await getToken();
    const lng = await i18nextLng();
    API.defaults.headers.common['Accept'] = 'application/json';

    API.defaults.headers.common['Content-Type'] = 'application/json';
    API.defaults.headers.common['authorization'] = token ? token?.trim() : '';
    API.defaults.headers.common['accept-language'] = lng ? lng : 'en';
  } catch (err) {
    console.log(err);
  }
};
