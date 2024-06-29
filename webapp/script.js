document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('startButton');
  const stopButton = document.getElementById('stopButton');
  const textField = document.getElementById('text');
  let recognition;
  let isRecording = false;

  if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support the Web Speech API');
  } else {
      recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = function () {
          isRecording = true;
          startButton.disabled = true;
          stopButton.disabled = false;
          console.log('Recording started');
      };

      recognition.onresult = function (event) {
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                  finalTranscript += event.results[i][0].transcript;
              }
          }
          textField.value += finalTranscript;
      };

      recognition.onerror = function (event) {
          console.error('Error occurred in recognition: ' + event.error);
      };

      recognition.onend = function () {
          isRecording = false;
          startButton.disabled = false;
          stopButton.disabled = true;
          console.log('Recording stopped');
      };
  }

  startButton.addEventListener('click', function () {
      if (!isRecording) {
          recognition.start();
      }
  });

  stopButton.addEventListener('click', function () {
      if (isRecording) {
          recognition.stop();
      }
  });
});

