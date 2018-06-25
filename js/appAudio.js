// Classes
import Player from './player.js';

// Instances
import audioManager from './audio-manager.js';


export default class AppAudio extends HTMLElement {

    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = this.template();
    }

    template() {
        const html = String.raw;
        return html` 
          <div>
              <h1>AudioMani</h1>
              <x-player id='first' url="./media/Samurai.mp3"></x-player>
              <x-player id='second' url="./media/Borderline.mp3"></x-player>
              <x-player id='third' url="./media/AllMyLife.mp3"></x-player>
              <hr/>
          </div>         
      `;
    }

    accessFirstAudioFile () {
        var firstMedia = this.shadowRoot.getElementById('first');
        var firstButton = firstMedia.shadowRoot.querySelector('button');
        firstButton.click();
    }
    accessSecondAudioFile () {
        var firstMedia = this.shadowRoot.getElementById('second');
        var firstButton = firstMedia.shadowRoot.querySelector('button');
        firstButton.click();
    }
    accessThirdAudioFile () {
        var firstMedia = this.shadowRoot.getElementById('third');
        var firstButton = firstMedia.shadowRoot.querySelector('button');
        firstButton.click();
    }


}

customElements.define('x-app', AppAudio);
