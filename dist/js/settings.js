export const select = {
  templateOf: {
    homeWidget: '#template-home-widget',
    searchWidget: '#template-search-widget',
    discoverWidget: '#template-discover-widget',
    audioPlayerWidget: '#template-song-widget'
  },
  containerOf: {
    pages: '#pages',
    home: '.page-home',
    search: '.page-search',
    discover: '.page-discover',
    joinNow: '.page-join-now'
  },
  nav: {
    links: '.navbar-link',
    discover: '#discover-nav'
  },
  home: {
    player: '.page-home .audio-player',
    songsList: '.songs',
    subscribeButton: '.button-subscribe'
  },
  search: {
    songsList: '.songs',
    player: '.page-search .audio-player',
    result: '.page-prompt'
  },
  searchbar: {
    input: 'input[type="text"]',
    button: '.button'
  },
  discover: {
    song: '.songs',
    player: '.page-discover .audio-player',
    button: '.page-title'
  },
};

export const settings = {
  db: {
    url: '//' + window.location.hostname + (window.location.hostname == 'localhost' ? ':3131' : ''),
    data: 'data',
  },
};

export const templates = {
  homeWidget: Handlebars.compile(document.querySelector(select.templateOf.homeWidget).innerHTML),
  searchWidget: Handlebars.compile(document.querySelector(select.templateOf.searchWidget).innerHTML),
  discoverWidget: Handlebars.compile(document.querySelector(select.templateOf.discoverWidget).innerHTML),
  audioPlayerWidget: Handlebars.compile(document.querySelector(select.templateOf.audioPlayerWidget).innerHTML),
};

export const classNames = {
  pages: {
    active: 'active',
  },
  nav: {
    active: 'active',
  },
};