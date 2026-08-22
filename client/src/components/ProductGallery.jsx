// ProductGallery - vertical thumbnail gallery + large main image viewer + lightbox.
//
// - Thumbnails are listed vertically on the left (images first, then videos).
// - Clicking a thumbnail changes what's shown in the big main viewer.
// - Clicking the main image opens a full-size lightbox popup.
// - If a product has a video, its thumbnail shows a small play icon.
// - If there are more items than fit in the thumbnail list, the last
//   visible thumbnail shows a "+N" badge (e.g. "+3") for the remaining
//   items. Clicking it opens the lightbox so you can browse everything.

import { useState } from "react";
import ImageLightbox from "./ImageLightbox";

const MAX_VISIBLE_THUMBNAILS = 4;

const ProductGallery = ({ images = [], videos = [], productName = "" }) => {
    // Combine images and videos into a single list of media items,
    // images first. Each item remembers whether it's an image or video.
    const media = [
        ...images.map((src) => ({ type: "image", src })),
        ...videos.map((src) => ({ type: "video", src })),
    ];

    // Always have at least one item, so the gallery never renders empty
    const safeMedia =
        media.length > 0 ? media : [{ type: "image", src: "/local-assets/images/placeholder.jpg" }];

    const [activeIndex, setActiveIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    const visibleThumbnails = safeMedia.slice(0, MAX_VISIBLE_THUMBNAILS);
    const extraCount = safeMedia.length - MAX_VISIBLE_THUMBNAILS;

    const handleNavigate = (direction) => {
        setActiveIndex((prev) => (prev + direction + safeMedia.length) % safeMedia.length);
    };

    const activeItem = safeMedia[activeIndex];

    return (
        <div className="product-gallery">
            {/* Vertical thumbnail list */}
            <div className="thumbnail-list">
                {visibleThumbnails.map((item, index) => {
                    const isLastVisibleSlot = index === MAX_VISIBLE_THUMBNAILS - 1;
                    const showMoreBadge = isLastVisibleSlot && extraCount > 0;

                    return (
                        <button
                            key={index}
                            type="button"
                            className={activeIndex === index ? "thumbnail-btn active" : "thumbnail-btn"}
                            onClick={() => setActiveIndex(index)}
                        >
                            {item.type === "video" ? (
                                <span className="thumbnail-video-wrapper">
                                    <video src={item.src} className="thumbnail" muted />
                                    <span className="thumbnail-play-icon">&#9658;</span>
                                </span>
                            ) : (
                                <img src={item.src} alt={`${productName} ${index + 1}`} className="thumbnail" />
                            )}

                            {showMoreBadge && (
                                <span
                                    className="thumbnail-more-badge"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveIndex(index);
                                        setLightboxOpen(true);
                                    }}
                                >
                                    +{extraCount}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Large main viewer */}
            <div className="main-image-wrapper">
                {activeItem.type === "video" ? (
                    <video src={activeItem.src} className="main-image" controls />
                ) : (
                    <img
                        src={activeItem.src}
                        alt={productName}
                        className="main-image"
                        onClick={() => setLightboxOpen(true)}
                    />
                )}
            </div>

            {lightboxOpen && (
                <ImageLightbox
                    media={safeMedia}
                    currentIndex={activeIndex}
                    onClose={() => setLightboxOpen(false)}
                    onNavigate={handleNavigate}
                />
            )}
        </div>
    );
};

export default ProductGallery;
