import "../styles/Hero.css"
import hero3 from "../images/hero3.jpg";

const Hero = () =>{
    return(
        <section className="hero-section">
            <div className="hero-content">
                <h1>Find your next favourite book</h1>
                <button className="hero-btn">Shop now</button>
            </div>
            <div className="hero-img">
                <img src={hero3} alt=""/>
            </div>
        </section>
    )
}

export default Hero;