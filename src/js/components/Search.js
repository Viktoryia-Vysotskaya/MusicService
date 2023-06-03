import { templates, select } from '../settings.js';
import AudioPlayer from './AudioPlayer.js';

class Search {
  constructor(element, data) {
    const thisSearch = this;
    thisSearch.authors = data.authors;
    thisSearch.songs = data.songs;
    thisSearch.render(element);
    thisSearch.initSearch();
    thisSearch.initWidgets();
  }

  render(element) {
    const thisSearch = this;
    thisSearch.dom = {};
    thisSearch.dom.wrapper = element;
    const generatedHTML = templates.searchWidget();
    thisSearch.dom.wrapper.innerHTML = generatedHTML;
    thisSearch.dom.songsList = thisSearch.dom.wrapper.querySelector(select.search.songsList);
    thisSearch.dom.input = thisSearch.dom.wrapper.querySelector(select.searchbar.input);
    thisSearch.dom.button = thisSearch.dom.wrapper.querySelector(select.searchbar.button);
    thisSearch.dom.result = thisSearch.dom.wrapper.querySelector(select.search.result);
    thisSearch.dom.error = thisSearch.dom.wrapper.querySelector('.search-error');
  }

  initWidgets() {
    const thisSearch = this;
    if (!thisSearch.resultCount) {
      thisSearch.dom.result.textContent = 'Search through all songs...';
    }
    for (const song of thisSearch.songs) {
      new AudioPlayer(song, thisSearch.authors, thisSearch.dom.songsList);
    }
    // eslint-disable-next-line
    GreenAudioPlayer.init({
      selector: select.search.player,
      stopOthersOnPlay: true,
    });

    thisSearch.dom.button.addEventListener('click', function (event) {
      event.preventDefault();
      if (thisSearch.resultCount === 1) {
        thisSearch.dom.result.textContent = 'We have found ' + thisSearch.resultCount + ' song...';
      } else {
        thisSearch.dom.result.textContent = 'We have found ' + thisSearch.resultCount + ' songs...';
      }
      thisSearch.dom.songsList.innerHTML = '';
      for (const song of thisSearch.searchResult) {
        new AudioPlayer(song, thisSearch.authors, thisSearch.dom.songsList);
      }
      // eslint-disable-next-line
      GreenAudioPlayer.init({
        selector: select.search.player,
        stopOthersOnPlay: true
      });
    });
  }

  initSearch() {
    const thisSearch = this;
    thisSearch.dom.button.addEventListener('click', function (event) {
      event.preventDefault();
      const searchPhrase = thisSearch.dom.input.value.trim();
      const selectedCategory = thisSearch.dom.wrapper.querySelector('.search-category').value;
      if (searchPhrase === '' && selectedCategory === '') {
        thisSearch.showError('Please enter a search term or select a category!');
        thisSearch.clearSongs();
        return;
      }
      thisSearch.getSearchResult(searchPhrase, selectedCategory);
      thisSearch.clearError();
      thisSearch.clearSongs(); 
      for (const song of thisSearch.searchResult) {
        new AudioPlayer(song, thisSearch.authors, thisSearch.dom.songsList);
      }
    });
  }
  
  clearSongs() {
    const thisSearch = this;
    thisSearch.dom.songsList.innerHTML = '';
  }

  showError(message) {
    const thisSearch = this;
    thisSearch.dom.error.textContent = message;
    thisSearch.dom.error.classList.add('show');
  }

  clearError() {
    const thisSearch = this;
    thisSearch.dom.error.textContent = '';
    thisSearch.dom.error.classList.remove('show');
  }

  getSearchResult(phrase, category) {
    const thisSearch = this;
    thisSearch.searchResult = [];
    thisSearch.resultCount = 0;
    for (const song of thisSearch.songs) {
      const titleMatches = phrase === '' || song.title.toLowerCase().includes(phrase.toLowerCase());
      const categoryMatches = category === '' || song.categories.includes(category);
      if (titleMatches && categoryMatches) {
        thisSearch.searchResult.push(song);
      }
    }
    thisSearch.resultCount = thisSearch.searchResult.length;
  }
}

export default Search;