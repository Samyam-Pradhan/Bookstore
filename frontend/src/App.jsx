// src/App.jsx
import './App.css';
import { useState, useEffect } from 'react';
import Homepage from './pages/Hompage';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Homepage
        user={user}
        onLoginClick={() => setShowLogin(true)}
        onSignupClick={() => setShowSignup(true)}
      />

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}

      <Routes>
        {/* No /logout route anymore */}
      </Routes>
    </Router>
  );
}

export default App;
