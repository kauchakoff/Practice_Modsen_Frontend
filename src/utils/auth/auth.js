//иммитация бэка


import {http} from "../http";
import axios from "axios";


export const login = async (email, password) => {
  if (email && password) {
    const userData = {
      userData: email,
      password: password,
    }
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("role");
      const response = await http.post('/auth/authenticate', userData);
      localStorage.setItem("userId",await  response.data.userId);
      localStorage.setItem("accessToken", await response.data.accessToken);
      localStorage.setItem("refreshToken", await response.data.refreshToken);
      localStorage.setItem("role", await response.data.role);
      localStorage.setItem("user",await response.data.userData)
      return localStorage.getItem("user")
    } catch (error) {
      if(error.response){
          throw new Error(error.response.message)
      }
    }
  } else {
    throw new Error('Invalid email or password');
  }
};

export const register = async (userData) => {
  console.log("email"+userData.email)
  if (userData.email && userData.passwordHash) {
    try {
      localStorage.removeItem("user");
      const response = await http.post('/auth/register', userData);

      localStorage.setItem("userId",await  response.data.userId);
      localStorage.setItem("accessToken", await response.data.accessToken);
      localStorage.setItem("refreshToken", await response.data.refreshToken);
      localStorage.setItem("role", await response.data.role);
      localStorage.setItem("user",await response.data.userData)

      return localStorage.getItem("user");
    } catch (error) {
        if(error.response){
          throw new Error("Failed to register user")
        }
    }
  } else {
    throw new Error("Fill empty fields")
  }
};

export const logout = async () => {

  localStorage.removeItem("user");

  window.location.reload();
};

export const checkAuthStatus =  () => {
  console.log("AccessToken"+localStorage.getItem("accessToken"))
  return localStorage.getItem("user");

};


// Добавление перехватчика для запросов
http.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) return config; // Если токена нет, возвращаем конфигурацию без изменений
  if (config?.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`; // Добавляем токен в заголовки
  }
  return config;
});


// Добавление перехватчика для ответов

// Добавьте новый перехватчик ответов
http.interceptors.response.use(undefined, async error => {
  const originalRequest = error.config;
  console.log("popal in resfresh")
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = localStorage.getItem('refreshToken');
    localStorage.removeItem("accessToken")
    if (refreshToken) {
      try {
        const response = await http.post('/auth/refresh-token', null, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        localStorage.setItem('accessToken', await response.data.accessToken);
        return http(originalRequest);
      } catch (err) {
        localStorage.removeItem('refreshToken');
        window.location.reload();
      }
    } else {
      localStorage.removeItem('refreshToken');
    //  console.log("Egor:"+err.message)
      window.location.reload();
    }
  }
  return Promise.reject(error);
});
