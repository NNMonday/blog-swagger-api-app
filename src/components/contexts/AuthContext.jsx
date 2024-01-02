import React, { useCallback, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from '../LoadingIndicator';

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const clearToken = useCallback(() => {
    // setTimeout(() => {
    //   setCurrentUser(null);
    //   localStorage.removeItem('jwtToken');
    //   window.location.reload();
    // }, 1000 * 60 * 10)
  }, [])

  const attachHeaders = useCallback((user) => {
    setCurrentUser(user)
    localStorage.setItem('jwtToken', user.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`
    clearToken()
  }, [clearToken])

  const getUser = useCallback(async () => {
    if (localStorage.getItem('jwtToken')) {
      try {
        const res = await axios.get('https://api.realworld.io/api/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          }
        })
        attachHeaders(res.data.user)
      } catch (err) {
        console.log(err);
        localStorage.removeItem('jwtToken')
      }
    }
  }, [attachHeaders])

  async function register(username, email, password) {
    try {
      const res = await axios.post('https://api.realworld.io/api/users', {
        user: {
          username,
          email,
          password
        }
      });
      attachHeaders(res.data.user)
    } catch (err) {
      throw err;
    }
  }

  async function login(email, password) {
    try {
      const res = await axios.post('https://api.realworld.io/api/users/login', {
        user: {
          email,
          password
        }
      })
      attachHeaders(res.data.user);
    } catch (err) {
      throw err
    }
  }

  function logout() {
    clearTimeout(clearToken)
    setCurrentUser(null)
    localStorage.removeItem('jwtToken')
    delete axios.defaults.headers.common['Authorization'];
  }

  async function updateUser(image, username, bio, email, password) {
    const newUser = {
      ...(email.length > 0 && email !== currentUser.email && { email }),
      ...(password.length > 0 && { password }),
      ...(username.length > 0 && username !== currentUser.email && { username }),
      ...(bio.length > 0 && bio !== currentUser.bio && { bio }),
      ...(image.length > 0 && image !== currentUser.image && { image }),
    }
    try {
      const res = await axios.put('https://api.realworld.io/api/user',
        {
          user: {
            ...newUser
          }
        })
      clearTimeout(clearToken)
      attachHeaders(res.data.user)
    } catch (err) {
      throw err
    }
  }

  const isLogin = () => {
    if (!currentUser) {
      navigate('/login');
      throw new Error('No authenticate');
    }

    return true;
  };

  const value = {
    currentUser,
    getUser,
    register,
    login,
    logout,
    updateUser,
    isLogin
  }

  useEffect(() => {
    (async () => {
      setLoading(true)
      await getUser();
      setLoading(false)
    })()
  }, [getUser]);

  return (
    <AuthContext.Provider value={value}>
      {loading
        ?
        <LoadingIndicator />
        :
        children}
    </AuthContext.Provider>
  )
}
