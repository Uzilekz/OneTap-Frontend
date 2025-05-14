import "./App.css";
import "./styles/normalize.css";
import "./styles/global.css";
import "./styles/variables.css";
import Header from "./components/layout/Header.jsx";
import Hero from "./pages/components/Hero.jsx";
import SponsorsCarousel from "./components/SponsorsCarousel.jsx";

function App() {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <SponsorsCarousel />
            </main>
        </>
    );
}

export default App;
