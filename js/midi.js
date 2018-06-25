function initMidi(t) {
    t.value = 'hello world';
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
}
