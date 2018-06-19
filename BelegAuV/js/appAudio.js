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
              <x-player url="./media/finalesong.wav"></x-player>
              <x-player url="./media/leanon.wav"></x-player>
              <x-player url="./media/neverland.wav"></x-player>
              <hr/>
          </div>
      `;
    }

}

customElements.define('x-app', AppAudio);
