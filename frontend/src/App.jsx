import './App.css';
import { useState, useEffect } from 'react';
import Homepage from './pages/Hompage';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase';
import Shop from './pages/Shop';

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
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}

      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              user={user}
              onLoginClick={() => setShowLogin(true)}
              onSignupClick={() => setShowSignup(true)}
            />
          }
        />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </Router>
  );
}

export default App;
