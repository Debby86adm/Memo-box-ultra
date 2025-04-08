let mediaRecorder;
let audioChunks = [];

const recordButton = document.getElementById("record");
const stopButton = document.getElementById("stop");
const audioPlayback = document.getElementById("audioPlayback");
const sendButton = document.getElementById("send");
const recipientInput = document.getElementById("recipient");
const statusDiv = document.getElementById("status");

recordButton.onclick = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
    });

    mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        audioPlayback.src = audioUrl;
    });

    recordButton.disabled = true;
    stopButton.disabled = false;
};

stopButton.onclick = () => {
    mediaRecorder.stop();
    recordButton.disabled = false;
    stopButton.disabled = true;
};

sendButton.onclick = () => {
    const recipient = recipientInput.value;
    if (recipient) {
        statusDiv.innerText = `Messaggio inviato a ${recipient}! (non proprio, ma immaginiamolo!)`;
    } else {
        statusDiv.innerText = "Messaggio lanciato nel web... qualcuno lo ascolterà!";
    }
};
