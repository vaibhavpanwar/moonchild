import NodeRSA from 'node-rsa';
import axios from 'axios';

const public_key =
  '-----BEGIN PUBLIC KEY-----\n' +
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBpZtROsHc1QJNTGASid8Vc5n4\n' +
  '+lY5wjYOGBXo405FFLXI9HpDzjA/IJI6l/AZh9mRIclpQ/7g9KDwuzZL02D+fR+/\n' +
  '9UkOwYufPD3esab3tCnluzhv8CN/nMoe0k9YUh+BZ27n6dET66uQSb/1zqmcMzdV\n' +
  'F94mmJ9HMvvK2wdmWQIDAQAB\n' +
  '-----END PUBLIC KEY-----';

const private_key =
  '-----BEGIN RSA PRIVATE KEY-----\n' +
  'MIICXQIBAAKBgQDBpZtROsHc1QJNTGASid8Vc5n4+lY5wjYOGBXo405FFLXI9HpD\n' +
  'zjA/IJI6l/AZh9mRIclpQ/7g9KDwuzZL02D+fR+/9UkOwYufPD3esab3tCnluzhv\n' +
  '8CN/nMoe0k9YUh+BZ27n6dET66uQSb/1zqmcMzdVF94mmJ9HMvvK2wdmWQIDAQAB\n' +
  'AoGAO1EqOYChH68UDG+HwkX/Usfdc1njjb/C5SBVncf7EsgcQxk4VorTVpL4mAAw\n' +
  'qPFnIMDTvG36phfpMLR4FlQCkol2PUsfw8x1jj8GssvsZqk2PANV/E7TZo84e/kp\n' +
  'jAPMXfWJmyIfHrc6F7mTyYnlTWy6znU49v9llAKx6qUutr0CQQDk6+7abke7Ael3\n' +
  'oAQXQ2WoysYfBRYFTKyxvmhTP4jE/5DVLjBsU8BbnuQUybWKuuJmUr9DSibln7cu\n' +
  'fuJjs/sXAkEA2I2BihdTZg9bS/GF8jkzRnDlq3PEXLhHC1ix/9OeQns8VU2MtcmF\n' +
  '083k8g61TxR32H6UBOqOzK/EWVeDq+/QDwJBAMDgkMT1ufY0rDMgXZIENTk8cCVe\n' +
  'sakRa0fvOBM8Ks5gzfTwD9iV0DLh8yYYtZ8Hyw2PlprpdVBve3Xvbmu3D00CQGn8\n' +
  'H7lBH00lGO67P25Edob0PEPEfgdPHV49Q6jMnnk1LVsmgEZ8YeY+r92UO0J/5wPr\n' +
  'N3CMh+U/5R5Aya29yhsCQQCDlUuiyM5uw2Rpqi09yX/2HVYVSC6zhnuNJSB8y4GV\n' +
  '7MFZnllwMerhULPdf8SmDM4tTQ+PZ4mRC3I5fmtYad+q\n' +
  '-----END RSA PRIVATE KEY-----';

export const login = (user) => {
  try {
    if (user && user.token && user.token !== '') {
      const key = new NodeRSA(public_key);
      const encrypted = key.encrypt(JSON.stringify(user), 'base64');
      localStorage.setItem('@gulf-worker-uni/auth-key', encrypted);
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
};

export const i18nextLng = () => {
  let lang = localStorage.getItem('i18nextLng') || 'ar';
  return lang;
};

export const API = axios.create({
  baseURL: 'https://api.gccworkers.app/',
});

export const headerSetup = async (setSession) => {
  try {
    const token = await getToken();
    const lng = await i18nextLng();
    API.defaults.headers.common['Accept'] = 'application/json';

    API.defaults.headers.common['Content-Type'] = 'application/json';
    API.defaults.headers.common['Authorization'] = token ? token.trim() : '';
    API.defaults.headers.common['accept-language'] = lng ? lng : 'en';
  } catch (err) {
    console.log(err);
  }
};
