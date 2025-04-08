import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Feature from '../components/Feature';
import Category from '../components/Category';
import Countdown from '../components/Countdown';
import { Footer } from '../components/Footer';

function Homepage({ onLoginClick, onSignupClick }) {
  const targetDate = new Date(Date.now() + 16 * 60 * 60 * 1000).toISOString();

  return (
    <>
      <Navbar onLoginClick={onLoginClick} onSignupClick={onSignupClick} />
      <Hero />
      <Feature />
      <Countdown targetDate={targetDate} />
      <Category />
      <Footer />
    </>
  );
}

export default Homepage;
