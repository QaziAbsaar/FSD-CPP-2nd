// Authentication utilities
export const setAuthToken = (token, user) => {
  localStorage.setItem('access_token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

export const getAuthToken = () => {
  return localStorage.getItem('access_token');
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

export const isAdmin = () => {
  const user = getUser();
  return user?.role === 'admin';
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
};
