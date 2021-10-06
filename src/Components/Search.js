const Search = ({ instance, search, setSearch }) => {
  return (
    <section className="search-wrapper">
      <div className="searchbar">
        <label htmlFor="search">Search Posts</label>
        <input
          id="search"
          type="text"
          placeholder=" &#128269;     enter search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <span>
        <h3>{instance.length} results</h3>
      </span>
    </section>
  );
};

export default Search;
