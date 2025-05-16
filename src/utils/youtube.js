/**
 * Obtiene los detalles de un video de YouTube dado su ID,
 * usando la YouTube Data API v3.
 * Asegúrate de tener configurada la variable de entorno REACT_APP_YOUTUBE_API_KEY.
 */
export const fetchVideoDetails = async (videoId) => {
    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY; // Coloca tu API Key en un archivo .env
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet,contentDetails`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
            const { snippet, contentDetails } = data.items[0];
            return {
                title: snippet.title,
                publishedAt: formatPublishedDate(snippet.publishedAt),
                duration: `⏰ ${convertDuration(contentDetails.duration)}`,
            };
        }
        return null;
    } catch (error) {
        console.error("Error fetching video details:", error);
        return null;
    }
};

/**
 * Formatea la fecha de publicación para mostrar "hace {X horas}" o "hace {X días}".
 */
const formatPublishedDate = (publishedAt) => {
    const publishedDate = new Date(publishedAt);
    const now = new Date();
    const diffMs = now - publishedDate;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 24) {
        return `hace ${diffHours} horas`;
    } else {
        const diffDays = Math.floor(diffHours / 24);
        return `hace ${diffDays} días`;
    }
};

/**
 * Convierte una duración en formato ISO8601 (ej. "PT3M45S" o "PT1H2M30S")
 * a un formato más legible "MM:SS" o "H:MM:SS".
 */
const convertDuration = (isoDuration) => {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = isoDuration.match(regex);
    const hours = parseInt(matches[1]) || 0;
    const minutes = parseInt(matches[2]) || 0;
    const seconds = parseInt(matches[3]) || 0;

    const hDisplay = hours > 0 ? hours + ":" : "";
    // Si hay horas, se asegura de que los minutos tengan dos dígitos
    const mDisplay = hours > 0 && minutes < 10 ? "0" + minutes : minutes;
    const sDisplay = seconds < 10 ? "0" + seconds : seconds;
    return hDisplay
        ? `${hDisplay}${mDisplay}:${sDisplay}`
        : `${mDisplay}:${sDisplay}`;
};
