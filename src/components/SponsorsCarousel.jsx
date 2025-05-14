import React from "react";
import "../styles/components/SponsorsCarousel.css";

import sponsor1 from "../assets/images/sponsors/hernanMiller.webp";
import sponsor2 from "../assets/images/sponsors/lg.webp";
import sponsor3 from "../assets/images/sponsors/logitech-g.webp";
import sponsor4 from "../assets/images/sponsors/mercadoLibre.webp";
import sponsor5 from "../assets/images/sponsors/monsterEnergy.webp";
import sponsor6 from "../assets/images/sponsors/nvidia.webp";
import sponsor7 from "../assets/images/sponsors/razer.webp";

const sponsors = [
    sponsor1,
    sponsor2,
    sponsor3,
    sponsor4,
    sponsor5,
    sponsor6,
    sponsor7,
];

const SponsorsCarousel = () => {
    // Duplicamos el array para lograr un efecto marquee continuo
    const sponsorList = [
        ...sponsors,
        ...sponsors,
        ...sponsors,
        ...sponsors,
        ...sponsors,
    ];

    return (
        <div className="sponsors-carousel">
            <div className="carousel-track">
                {sponsorList.map((sponsor, index) => (
                    <div className="carousel-item" key={index}>
                        <img
                            src={sponsor}
                            alt={`Sponsor ${(index % sponsors.length) + 1}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SponsorsCarousel;
