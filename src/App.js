import "./App.css";
import "./styles/normalize.css";
import "./styles/global.css";
import "./styles/variables.css";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import Hero from "./pages/components/Hero.jsx";
import SponsorsCarousel from "./components/SponsorsCarousel.jsx";
import Highlights from "./pages/components/Highlights.jsx";

function App() {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <SponsorsCarousel />
                <Highlights />
                <Footer />
            </main>
        </>
    );
}

export default App;
