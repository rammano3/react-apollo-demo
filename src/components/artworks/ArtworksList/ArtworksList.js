import React from 'react';
import { useArtworskList } from './useArtworksList';

const styles = {
  listContainer: { display: 'flex', flexWrap: 'wrap' },
  listItem: { maxWidth: 200, padding: 8 },
  listItemImage: { width: '100%' },
};

export function ArtworksList() {
  const {
    artworks,
    handleNewTerm,
    handleNext,
    handlePrev,
    loading,
    previousPage,
    searchInputValue,
    setSearchInputValue,
    total,
  } = useArtworskList();

  return (
    <div>
      <h1>Artworks</h1>
      <input
        aria-label="Search Art"
        type="text"
        onChange={e => setSearchInputValue(e.target.value)}
        value={searchInputValue}
      />
      <button onClick={handleNewTerm} disabled={loading}>
        Search
      </button>
      {previousPage > 0 && (
        <button onClick={handlePrev} disabled={loading}>
          Previous
        </button>
      )}
      <button onClick={handleNext} disabled={loading}>
        Next
      </button>
      <span>Total : {total}</span>
      <div style={styles.listContainer}>
        {loading && (
          <div role="progressbar" aria-valuetext="Loading..." aria-busy="true">
            Loading...
          </div>
        )}
        {artworks.map(artwork => (
          <div key={artwork.node.id} style={styles.listItem}>
            <div>
              <img
                alt={artwork.node.title}
                src={artwork.node.image.url}
                style={styles.listItemImage}
              />
            </div>
            <div>{artwork.node.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArtworksList;
