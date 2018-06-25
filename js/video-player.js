// Instances
import renderer from './renderer.js';

export default class VideoPlayer extends HTMLElement {

    constructor() {
        super();

        const url = this.getAttribute('url');

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = this.template(url);

        this.cnv = this.shadowRoot.querySelector("#video-canvas");
        this.cnvCtx = this.cnv.getContext("2d");

        this.video = this.shadowRoot.querySelector("#video-el");
        this.video.addEventListener('loadedmetadata', () => {
            this.width = this.video.videoWidth;
            this.height = this.video.videoHeight;
            this.cnv.width = this.width;
            this.cnv.height = this.height;

            // Start Rendering when meta-data was loaded
            renderer.addRenderTask(this.updateCanvas.bind(this));
        });
    }

    updateCanvas() {
        this.cnvCtx.clearRect(0,0,this.width, this.height);
        this.cnvCtx.drawImage(this.video,0,0,this.width,this.height);

        this.chromaKeyAlpha();
    }

    chromaKeyAlpha() {
        let imageData = this.cnvCtx.getImageData(0,0,this.width,this.height);
        let data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            data[i + 3] = (data[i] + data[i + 1] + data[i + 2]) / 3; // blue
        }

        this.cnvCtx.putImageData(imageData,0,0);
    }

    template(url) {
        const html = String.raw;

        return html`
            <style>
              video {
                display : none;
              }
              span {
                display: block;
              }
            </style>
            <div class="wrapper">
              <video id="video-el" src="${url}" autoplay loop></video>
              <canvas id="video-canvas"></canvas>
            </div>
        `;
    }
}

customElements.define('x-video-player', VideoPlayer);
