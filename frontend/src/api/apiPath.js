const HOST = 'https://j7b105.p.ssafy.io:9000/api/v1/';

const AUTH = 'auth/';
const USER = 'user/';

const apiPath = {
  auth: {
    login: () => HOST + AUTH + 'login',
    logout: () => HOST + AUTH + 'logout',
    reaccess: () => HOST + AUTH + 'reaccess',
  },
  user: {
    customer: () => HOST + USER + 'register',
    seller: () => HOST + USER + 'register/company',
    update: () => HOST + USER + 'update',
    delete: () => HOST + USER + 'delete',
  },
};

export default apiPath;