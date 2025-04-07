import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Feature from './components/Feature'
import Category from './components/Category'
import Countdown from './components/Countdown'
import { Footer } from './components/Footer'

function App() {
  const targetDate = new Date(Date.now() + 16 * 60 * 60 * 1000).toISOString(); // 2 hours from now
 return (
    <>
      <Navbar />
      <Hero />
      <Feature />
      <Countdown targetDate={targetDate} />
      <Category />
      <Footer />
    </>
  )
}

export default App
