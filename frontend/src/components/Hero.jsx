import "../styles/Hero.css"
import hero from "../images/hero.jpg";

const Hero = () =>{
    return(
        <section className="hero-section">
            <div className="hero-content">
                <h1>Find your next favourite book</h1>
                <button className="hero-btn">Shop now</button>
            </div>
            <div className="hero-img">
                <img src={hero} alt="" />
            </div>
        </section>
    )
}

export default Hero;