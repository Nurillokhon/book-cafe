
const Shadows = () => {
    const ACCENT = "#66C2A8";

    return (
        <div>
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/30 via-black/10 to-black/40" />
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl"
                style={{ backgroundColor: `${ACCENT}33` }}
            />
            <div
                className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl"
                style={{ backgroundColor: `${ACCENT}26` }}
            />
        </div>
    );
}

export default Shadows;
