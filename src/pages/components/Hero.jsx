import "../../styles/components/Hero.css";
import backgroundVideo from "../../assets/videos/Hero.mp4"; // Asegúrate de que la ruta sea correcta

const Hero = () => {
    return (
        <section className="hero">
            <video
                className="hero-video"
                src={backgroundVideo}
                autoPlay
                loop
                muted
                playsInline
            />
            <div className="hero-dark-overlay" />
            <div className="hero-overlay">
                <h1>ONETAP</h1>
            </div>
        </section>
    );
};

export default Hero;
