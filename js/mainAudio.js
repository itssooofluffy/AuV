import AppAudio from './appAudio.js';
import './midi.js';

let app = new AppAudio();

document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(app);
    createTextArea();
    initMidi();
});

function createTextArea() {

    var input = document.createElement('TEXTAREA');
    input.resize = 'none';
    input.id = 'result';
    input.width = 400;
    input.height = 100;
    input.overflowY = scroll();
    document.body.appendChild(input);
}

function initMidi() {
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(
            midiSuccess,
            midiFailure
        );
    } else {
        midiFailure();
    }
}

function midiSuccess(midi) {
    let textArea = document.getElementById('result');
    textArea.value = 'Midi is working!';

    var inputs = midi.inputs;
    for (var input of inputs.values()) {
        input.onmidimessage = onMidiMessage;
    }
}

function midiFailure() {
    let textArea = document.getElementById('result');
    textArea.value = 'Failure: Midi is not working!';
}

function onMidiMessage(event) {
    let textArea = document.getElementById('result');
    let cmd = event.data[0] >> 4;
    let channel = event.data[0] & 0xf;
    let btnID = event.data[1];
    let value = event.data[2];

    textArea.value += "\n" +
        "New Event (on Channel: " + channel + ")==> Type: " + cmd +
        ", Origin: " + btnID +
        ", Value: " + value;

    textArea.scrollTop = textArea.scrollHeight;

    if (btnID === 48 && value > 0) {
        app.accessFirstAudioFile();
    }

    if (btnID === 49 && value > 0) {
        app.accessSecondAudioFile();
    }

    if (btnID === 50 && value > 0) {
        app.accessThirdAudioFile();
    }
}

