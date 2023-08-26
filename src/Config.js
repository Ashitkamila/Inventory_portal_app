// const getRequiredUatApis = () => {
//   return {
//     REACT_APP_baseURL: "http://20.235.30.213:7010/api/",
//     REACT_APP_X_API_KEY:
//       "QGz496VOPFqC1SjlJqpyoPcLG1HK7F12E6pvC28i9sVvLZkPZw0v3EbLkkR6lnaafcHZcw3Rpxx59Ngxvg4fY2k93VV9Apgzbf8cf9IfYVFSt4YoYq5LA3MJBhUb1oO8",
//   };
// };
const getRequiredUatApis = () => {
  return {
    REACT_APP_baseURL: "http://20.219.104.23:4040",
    REACT_APP_X_API_KEY:
      "QGz496VOPFqC1SjlJqpyoPcLG1HK7F12E6pvC28i9sVvLZkPZw0v3EbLkkR6lnaafcHZcw3Rpxx59Ngxvg4fY2k93VV9Apgzbf8cf9IfYVFSt4YoYq5LA3MJBhUb1oO8",
  };
};

const getRequiredProdApis = () => {
  return {
    REACT_APP_baseURL: "https://zarvis-api.censanext.com/api/",
    REACT_APP_X_API_KEY:
      "g7lGAKCmXc41KsLRSLfenxomE2jkE0IH9xLl9g6l2fCVRzoYAQiiZIAp41Hz3aadrc067WMpk9rdHWYm0TfaK7SuN5ZOLwO3K5sZuW0Q6aKo6bTHLZ6TaVfp2XB4Jl8V",
  };
};

//UAT Environment
const uat = getRequiredUatApis();

//Production Environment
const production = getRequiredProdApis();

let configVariables = {};

//Change the config for production and development
switch (process.env.REACT_APP_BUILD_ENV) {
  case "uat":
    configVariables = {
      ...uat,
    };
    break;

  case "production":
    configVariables = {
      ...production,
    };
    break;
  default:
    configVariables = {
      ...uat,
    };
    break;
}

// ecporting the defaults
export default {
  ...configVariables,
};
