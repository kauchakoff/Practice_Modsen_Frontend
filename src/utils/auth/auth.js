//иммитация бэка
let mockUser = null;

export const login = (email, password) => {
  if (email === 'test@example.com' && password === 'password') {
    mockUser = { email };
    return mockUser;
  } else {
    throw new Error('Invalid email or password');
  }
};

export const register = (email, password) => {
  if (email && password) {
    mockUser = { email };
    return mockUser;
  } else {
    throw new Error('Registration failed');
  }
};

export const logout = () => {
  mockUser = null;
};

export const checkAuthStatus = () => {
  return mockUser;
};