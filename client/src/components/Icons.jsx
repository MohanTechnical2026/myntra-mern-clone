// Small, simple line icons used in the Header (profile, wishlist, bag).
// Kept as plain inline SVG instead of adding an icon library dependency,
// to keep this beginner project's dependency list small.

export const UserIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
);

export const HeartIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 20s-7-4.4-9.5-9C1 7.5 3 4 6.5 4c2 0 3.4 1 5.5 3 2.1-2 3.5-3 5.5-3C21 4 23 7.5 21.5 11 19 15.6 12 20 12 20z" />
    </svg>
);

export const BagIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 8h12l1 13H5L6 8z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
);
