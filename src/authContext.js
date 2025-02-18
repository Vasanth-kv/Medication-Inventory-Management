import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Load user & token from localStorage on first load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log("✅ User retrieved from localStorage:", parsedUser);
      } catch (error) {
        console.error("❌ Error parsing user data:", error);
        logout(); // Clear if invalid
      }
    }
  }, []);

  // ✅ Login function: Stores user & token
  const login = (userData, token) => {
    try {
      console.log("🔑 Login called, token:", token);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("❌ Login error:", error);
    }
  };

  // ✅ Logout function: Clears user data & token
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  // ✅ Get token for authentication headers
  const getToken = () => localStorage.getItem('token');

  return (
    <AuthContext.Provider value={{ user, login, logout, getToken, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook to use authentication context
export const useAuth = () => useContext(AuthContext);



// import React, { createContext, useState, useContext, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);

//   const login = (userData, token) => {
//     console.log("Login function called with token:", token);
//     console.log("User data being saved:", userData); // Check what data you're saving
//     localStorage.setItem('token', token);
//     localStorage.setItem('user', JSON.stringify(userData));
//     setIsLoggedIn(true);
//     setUser(userData);
//   };
  

//   const logout = () => {
//     localStorage.removeItem('user'); // Clear user data
//     localStorage.removeItem('token'); // Clear the token on logout
//     setIsLoggedIn(false);
//     setUser(null);
//   };

//   const getToken = () => {
//     return localStorage.getItem('token'); // Get token from localStorage
//   };

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const storedToken = localStorage.getItem('token'); // Check if token exists
//     if (storedUser && storedToken) {
//       try {
//         const parsedUser = JSON.parse(storedUser); // Safe to parse now
//         setUser(parsedUser);
//         setIsLoggedIn(true);
//         console.log("User retrieved from localStorage:", parsedUser); // Log for debugging
//       } catch (error) {
//         console.error("Failed to parse stored user data:", error);
//         logout(); // Optionally, you can log out if parsing fails
//       }
//     }
//   }, []);
  

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, user, login, logout, getToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


