import React, { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { ThemeContext } from './contexts/ThemeContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ThemeToggle from './components/ThemeToggle';
import './styles/App.css';

function App() {
  const { user, loading } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [currentView, setCurrentView] = React.useState('login');

  if (loading) {
    return (
      <div className={`app ${theme}`}>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`app ${theme}`}>
      <ThemeToggle />
      
      {!user ? (
        <div className="auth-container">
          <div className="auth-header">
            <h1 className="app-title"><h1 style={{fontSize:63}}>Android Club </h1><h2 style={{fontSize:43,font:'Arial'}}>Hackathon 2025!!</h2> </h1>
            <p className="app-subtitle">Register your team for the ultimate coding challenge</p>
          </div>

          <div className="auth-toggle">
            <button 
              className={`toggle-btn ${currentView === 'login' ? 'active' : ''}`}
              onClick={() => setCurrentView('login')}
            >
              Login
            </button>
            <button 
              className={`toggle-btn ${currentView === 'register' ? 'active' : ''}`}
              onClick={() => setCurrentView('register')}
            >
              Register
            </button>
          </div>

          {currentView === 'login' ? <Login /> : <Register />}
        </div>
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;