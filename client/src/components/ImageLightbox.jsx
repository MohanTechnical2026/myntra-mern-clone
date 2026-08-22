// ImageLightbox - a simple full-screen popup that shows one media item
// (image or video) at full size, with Next/Previous arrows (if there's
// more than one item) and a Close button. Closes on backdrop click or
// pressing Escape.
//
// "media" is an array of { type: "image" | "video", src }.

import { useEffect } from "react";

const ImageLightbox = ({ media, currentIndex, onClose, onNavigate }) => {
    // Allow closing the lightbox with the Escape key, and arrow keys to browse
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") onNavigate(1);
            if (e.key === "ArrowLeft") onNavigate(-1);
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose, onNavigate]);

    const activeItem = media[currentIndex];

    return (
        <div className="lightbox-overlay" onClick={onClose}>
            <button className="lightbox-close" onClick={onClose} aria-label="Close">
                &times;
            </button>

            {media.length > 1 && (
                <button
                    className="lightbox-nav lightbox-prev"
                    onClick={(e) => {
                        e.stopPropagation();
                        onNavigate(-1);
                    }}
                    aria-label="Previous"
                >
                    &#8249;
                </button>
            )}

            {activeItem.type === "video" ? (
                <video
                    src={activeItem.src}
                    className="lightbox-image"
                    controls
                    autoPlay
                    onClick={(e) => e.stopPropagation()}
                />
            ) : (
                <img
                    src={activeItem.src}
                    alt="Product full size"
                    className="lightbox-image"
                    onClick={(e) => e.stopPropagation()}
                />
            )}

            {media.length > 1 && (
                <button
                    className="lightbox-nav lightbox-next"
                    onClick={(e) => {
                        e.stopPropagation();
                        onNavigate(1);
                    }}
                    aria-label="Next"
                >
                    &#8250;
                </button>
            )}
        </div>
    );
};

export default ImageLightbox;
