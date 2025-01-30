export default function Search({ searchTerm, setSearchTerm }) {
    return (
        <div className="search-container flex">
            <img src="/search.svg" alt="Search icon" className="search-icon" />
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for movies..."
                className="search-input"
                aria-label="Search movies"
            />
        </div>
    );
}
