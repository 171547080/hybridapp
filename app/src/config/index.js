import Config from 'react-native-config';
const DEFAULF_CONFIG = {
  webAppUrl:'https://127.0.0.1:80'
}


const result = {
  apiUrl: Config.API_URL,
  version: Config.VERSION,
  webAppUrl: Config.WEB_APP_URL || DEFAULF_CONFIG.webAppUrl
};

export default result;
