// Classes
import Player from './video-player.js';

export default class AppVideo extends HTMLElement {

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = this.template();
    }

    template() {
        const html = String.raw;

        return html`
            <style>
              video, x-video-player {
                position: absolute;
              }
              </style>
            <div>
                <h1>Video</h1>
                <h2>Video-Player</h2>
                <div id="player-wrapper">
                  <video autoplay loop controls src="./media/On_my_own.ogv"></video>
                  <x-video-player url="./media/Hakuouk.ogv"></x-video-player>                
                </div>
            </div>
        `;
    }

}

customElements.define('x-app', AppVideo);
