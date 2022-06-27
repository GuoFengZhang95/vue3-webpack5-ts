const MODE = process.env.MODE
const ENV = process.env.ENV
const domain = {
  local: {
    Mall_Base_Url: '/mall-api',
    Vip_Base_Url: '/vip-api',
    Api_Base_Url: '/api-api',
    SaaS_Base_Url: '/saas-api',
    Service_Login_Url: '/service-login-api',
    Mis_Service_Url: '/mis-service',
    Yqmm_Api_Url: '/yqmm-api',
    App_Web_Base_Url: '/app-web-api',
    Login_Base_Url: '/login-api',
    Yqmm_Service_Base_Url: '/yqmm-service-api',
  },
  server: {
    Mall_Base_Url: `https://uw${ENV}.17m17.com/mall-api`,
    Vip_Base_Url: `https://vip${ENV}.mumuxili.com`,
    Api_Base_Url: `https://uw${ENV}.17m17.com/api`,
    SaaS_Base_Url: `https://api${ENV}.17m17.com`,
    Service_Login_Url: `https://login${ENV}.mumuxili.com`,
    Mis_Service_Url: `https://uw${ENV}.17m17.com/mis-service`,
    Yqmm_Api_Url: `https://yqmm-api${ENV}.mumuxili.com`,
    App_Web_Base_Url: `https://app-web${ENV}.17m17.com`,
    Login_Base_Url: `https://login-api${ENV}.mumuxili.com`,
    Yqmm_Service_Base_Url: `https://yqmm-service${ENV}.mumuxili.com`,
  },
}

export default domain[MODE]
