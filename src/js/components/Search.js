import { templates, select } from '../settings.js';
import AudioPlayer from './AudioPlayer.js';

class Search {
  constructor(element, data){
    const thisSearch = this;
    thisSearch.authors = data.authors;
    thisSearch.songs = data.songs;
    thisSearch.render(element);
    thisSearch.initSearch();
    thisSearch.initWidgets();
  }

  render(element){
    const thisSearch = this;
    thisSearch.dom = {};
    thisSearch.dom.wrapper = element;
    const generatedHTML = templates.searchWidget();
    thisSearch.dom.wrapper.innerHTML = generatedHTML;
    thisSearch.dom.songsList = thisSearch.dom.wrapper.querySelector(select.search.songsList);
    thisSearch.dom.input = thisSearch.dom.wrapper.querySelector(select.searchbar.input);
    thisSearch.dom.button = thisSearch.dom.wrapper.querySelector(select.searchbar.button);
    thisSearch.dom.result = thisSearch.dom.wrapper.querySelector(select.search.result);
  }

  initWidgets(){
    const thisSearch = this;
    if (!thisSearch.resultCount){
      thisSearch.dom.result.innerHTML = 'Search through all songs...';
    }
    for (const song of thisSearch.songs) {
      new AudioPlayer(song, thisSearch.authors, thisSearch.dom.songsList);
    }

    // eslint-disable-next-line
     GreenAudioPlayer.init({
      selector: select.search.player, 
      stopOthersOnPlay: true,
    });

    thisSearch.dom.button.addEventListener('click', function(event) {
      event.preventDefault();
      if(thisSearch.resultCount == 1) {
        thisSearch.dom.result.innerHTML = 'We have found ' + thisSearch.resultCount + ' song...';
      } else {
        thisSearch.dom.result.innerHTML = 'We have found ' + thisSearch.resultCount + ' songs...';
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

  initSearch(){
    const thisSearch = this;
    thisSearch.dom.button.addEventListener('click', function(event) {
      event.preventDefault();
      let searchPhrase = thisSearch.dom.input.value;
      if(searchPhrase !== '')
        thisSearch.getSearchResult(searchPhrase);
    });
  }

  getSearchResult(phrase){
    const thisSearch = this;
    thisSearch.searchResult = [];
    thisSearch.resultCount = 0;
    for(const song of thisSearch.songs) {
      if(song.title.toLowerCase().includes(phrase.toLowerCase())){
        thisSearch.searchResult.push(song);
        console.log(thisSearch.searchResult);
      }
    }
    thisSearch.resultCount = thisSearch.searchResult.length;
  }
}

export default Search;