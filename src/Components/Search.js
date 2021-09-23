const Search = ({ instance }) => {
  return (
    <section className="search-wrapper">
      <div className="searchbar">
        <label htmlFor="search">Search Posts</label>
        <input
          id="search"
          type="text"
          placeholder=" &#128269;"
          // value={search}
          onChange={(e) => console.log(e.target.value)}
        />
      </div>
      <span>
        <h3>{instance.length} results</h3>
      </span>
    </section>
  );
};

export default Search;
