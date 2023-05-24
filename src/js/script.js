import { settings, select, classNames } from './settings.js';
import Home from './components/Home.js';
import Search from './components/Search.js';
import Discover from './components/Discover.js';
import JoinNow from './components/JoinNow.js';

const app = {
  initData: function() {
    const thisApp = this;
    const url = settings.db.url + '/' + settings.db.data;
    this.data = {};
    fetch(url)
      .then((rawResponse) => {
        return rawResponse.json();
      })
      .then((parsedResponse) => {
        thisApp.data = parsedResponse;
        thisApp.initPages();
        thisApp.initHome();
        thisApp.initSearch();
        thisApp.initDiscover();
        thisApp.initJoinNow();
      });
  },

  urlHooks: {},

  initPages: function(){
    const thisApp = this;
    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);
    thisApp.button = document.querySelector(select.home.subscribeButton);
    const idFromHash = window.location.hash.replace('#/', '');
    let pageMatchingHash = thisApp.pages[0].id;
    for(let page of thisApp.pages) {
      if(page.id == idFromHash){
        pageMatchingHash = page.id;
        break;
      }
    }
    thisApp.activatePage(pageMatchingHash);
    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function(event) {
        const clickedElement = this;
        event.preventDefault();
        // get page id from href attribute
        const id = clickedElement.getAttribute('href').replace('#', '');
        // run thisApp.activatePage with that id
        thisApp.activatePage(id);
        // change URL hash 
        window.location.hash = '#/' + id;
      });
    }
  },

  activatePage: function(pageId){
    const thisApp = this;
    // add class "active" to matching pages, remove from non-matching
    for(let page of thisApp.pages){
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }
    // add class "active" to matching links, remove from non=matching
    for(let link of thisApp.navLinks){
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId);
    }
    if (thisApp.urlHooks[pageId]) {
      thisApp.urlHooks[pageId]();
    }
  },

  initHome: function(){
    const thisApp = this;
    const homeContainer = document.querySelector(select.containerOf.home);
    thisApp.home = new Home(homeContainer, thisApp.data);
  },

  initSearch: function(){
    const thisApp = this;
    const searchContainer = document.querySelector(select.containerOf.search);
    thisApp.search = new Search(searchContainer, thisApp.data);
  },

  initDiscover: function(){
    const thisApp = this;
    const discoverContainer = document.querySelector(select.containerOf.discover);
    thisApp.discover = new Discover(discoverContainer, thisApp.data);
    thisApp.urlHooks['discover'] = thisApp.discover.initWidgets;
  },

  initJoinNow: function(){
    const thisApp = this;
    const joinNowContainer = document.querySelector(select.containerOf.joinNow);
    thisApp.joinNow = new JoinNow(joinNowContainer, thisApp.data);
  },

  init: function() {
    const thisApp = this;
    thisApp.initData();
  },
};
    
app.init();