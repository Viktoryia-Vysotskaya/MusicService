import { templates } from '../settings.js';

class AudioPlayer {
  constructor(song, author, wrapper) {
    const thisAudioPlayer = this;
    thisAudioPlayer.song = song;
    thisAudioPlayer.authors = author;
    thisAudioPlayer.render(wrapper);
  }

  render(wrapper) {
    const thisAudioPlayer = this;
    thisAudioPlayer.dom = {};
    thisAudioPlayer.dom.wrapper = wrapper;
    const generatedHTML = templates.audioPlayerWidget(thisAudioPlayer.song);
    thisAudioPlayer.dom.wrapper.insertAdjacentHTML('beforeend', generatedHTML);
  }
}

export default AudioPlayer;