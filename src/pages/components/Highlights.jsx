import React, { useState, useEffect } from "react";
import { fetchVideoDetails } from "../../utils/youtube";
import { FaRegClock } from "react-icons/fa";
import "../../styles/components/Highlights.css";

// Función para extraer el ID de YouTube de diferentes formatos de URL
const getYoutubeVideoId = (url) => {
    const regExp =
        /(?:youtu\.be\/|youtube\.com.*(?:\?v=|\/embed\/|\/v\/))([^&\n?#]+)/;
    const match = url.match(regExp);
    return match && match[1] ? match[1] : null;
};

// Función para determinar automáticamente la orientación basada en la URL
const getOrientation = (clip) => {
    if (clip.orientation) return clip.orientation;
    if (clip.url.includes("/shorts/")) return "vertical";
    if (clip.url.includes("/embed/")) return "vertical";
    return "horizontal";
};

const initialClips = [
    { url: "https://youtu.be/M9klWeVpuUg?si=XbTz7zJ4QNr6lZT6" },
    { url: "https://www.youtube.com/watch?v=Ul5jGQs_WUE" },
    { url: "https://www.youtube.com/watch?v=ctMjx5iwFlA" },
    { url: "https://www.youtube.com/watch?v=Yyu0ReKuaJQ" },
    { url: "https://www.youtube.com/watch?v=rvXw4f8X1Sk" },
];

const Highlights = () => {
    const [clips, setClips] = useState(initialClips);
    const [activeClip, setActiveClip] = useState(null);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        // Función para actualizar la información de cada clip
        const updateClips = async () => {
            const updated = await Promise.all(
                initialClips.map(async (clip) => {
                    const videoId = getYoutubeVideoId(clip.url);
                    const details = await fetchVideoDetails(videoId);
                    return {
                        ...clip,
                        alt: details?.title || clip.alt,
                        // Se elimina "duration" ya que no se mostrará
                        uploaded: details?.publishedAt || clip.uploaded,
                    };
                })
            );
            setClips(updated);
        };
        updateClips();
    }, []);

    useEffect(() => {
        if (activeClip) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [activeClip]);

    const handleClick = (clip) => {
        setActiveClip(clip);
    };

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setActiveClip(null);
            setIsClosing(false);
        }, 300);
    };

    return (
        <section className="highlights-section">
            <h2>CLIPS DESTACADOS</h2>
            <div className="container">
                <div className="highlights-container">
                    {clips.map((clip, index) => {
                        const videoId = getYoutubeVideoId(clip.url);
                        const thumbnailUrl = videoId
                            ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                            : "";
                        return (
                            <div
                                className="clip-item"
                                key={index}
                                onClick={() => handleClick(clip)}
                            >
                                <div className="clip-image-container">
                                    <img src={thumbnailUrl} alt={clip.alt} />
                                    <div className="overlay">
                                        <div className="video-info">
                                            <p className="video-title">
                                                {clip.alt}
                                            </p>
                                            <span className="upload-info">
                                                <FaRegClock size={12} />{" "}
                                                {clip.uploaded}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {activeClip && (
                <div
                    className={`video-modal ${isClosing ? "fade-out" : ""}`}
                    onClick={handleClose}
                >
                    <div
                        className={`video-container ${getOrientation(
                            activeClip
                        )}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <iframe
                            src={
                                activeClip.url.includes("embed")
                                    ? activeClip.url
                                    : `https://www.youtube.com/embed/${getYoutubeVideoId(
                                          activeClip.url
                                      )}?playsinline=1`
                            }
                            title={activeClip.alt}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <button className="close-btn" onClick={handleClose}>
                        X
                    </button>
                </div>
            )}
        </section>
    );
};

export default Highlights;
