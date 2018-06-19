// Instances
import audioManager from './audio-manager.js';
import renderer from './renderer.js';

export default class Player extends HTMLElement {

    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = this.template();

        const url = this.getAttribute('url');
        this.audio = new Audio(url);

        renderer.addRenderTask(this.updateAudioTime.bind(this));
        renderer.addRenderTask(this.visualize.bind(this));


        // Get Audio element in Audio API
        this.source = audioManager.ctx.createMediaElementSource(this.audio);

        // Create AnalyserNode
        this.analyser = audioManager.ctx.createAnalyser();
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
        this.analyser.fftSize = 256;

        // Create GainNode
        this.gainNodeVolume = audioManager.ctx.createGain();

        // Create Filter


        this.source.connect(this.analyser);
        this.analyser.connect(this.gainNodeVolume);
        this.gainNodeVolume.connect(audioManager.ctx.destination);


        // this.crossGain = audioManager.ctx.createGain();
        // var gain = Math.cos(Math.random() * 0.5*Math.PI);
        // this.crossGain.gainNode.gain.value = gain;

        const canvas = this.shadowRoot.querySelector('#cnv');
        this.cnvCtx = canvas.getContext("2d");
    }

    template() {
        const html = String.raw;

        return html`
            <style>
                #progress {
                    background-color: gray;
                    width: 0%;
                    height: 22px;
                }
                #cnv {
                  height: 80px;
                  width: 700px;
                  background-color: black;
                }
            </style>
            <div>
                <div id="progress"></div>
                <div></div><button type="button">Play/Pause</button>
                <input type="range" id="volume" min="0" max="10"></div>
                <canvas id="cnv" height="80" width="700"></canvas>
            </div>
        `;
    }

    visualize() {
        this.analyser.getByteTimeDomainData(this.dataArray);

        this.cnvCtx.clearRect(0,0,700,80);

        let barWidth = (700 / this.bufferLength) * 2.5;
        let barHeight;
        let x = 0;
        for(let i = 0; i < this.bufferLength; i++) {
            barHeight = this.dataArray[i]/2;

            this.cnvCtx.fillStyle = 'rgb(' + (barHeight+255) + ',255,255)';
            this.cnvCtx.fillRect(x,barHeight/2,barWidth,barHeight);

            //this.cnvCtx.fillStyle = 'rgb(0,0,0)';
            //this.cnvCtx.fillRect(x,95-barHeight/2,barWidth,barHeight);

            x += barWidth + 1;
        }
    }

    connectedCallback() {
        const button = this.shadowRoot.querySelector('button');
        this.elProgress = this.shadowRoot.querySelector('#progress');
        const volume = this.shadowRoot.querySelector('#volume');

        button.addEventListener('click', this.handleButtonClick.bind(this));
        volume.addEventListener('change', this.setVolume.bind(this));
    }

    handleButtonClick() {
        if (this.audio.paused) {
            this.audio.play();
        }
        else {
            this.audio.pause();
        }
    }

    setVolume() {
        let volume = parseInt(this.shadowRoot.getElementById("volume").value);
        this.gainNodeVolume.gain.value = volume;
    }

    updateAudioTime() {
        const progress = this.audio.currentTime / this.audio.duration;
        this.elProgress.style.width = (progress * 100) + '%';
    }

}

customElements.define('x-player', Player);
