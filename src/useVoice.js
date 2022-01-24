import { useState, useEffect } from "react";

let speech = null;

if (window.webkitSpeechRecognition) {
  speech = new window.webkitSpeechRecognition();
  speech.continuous = true;
}

const useVoice = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);

  const listen = () => {
    setIsListening((isListening) => !isListening);

    if (isListening) {
      speech.stop();
      return;
    }

    speech.start();
  };

  useEffect(() => {
    if (!speech) {
      setText("Unfortunately your browser doesn't support the Speech API");
      return;
    }

    speech.onresult = (event) => {
      setText(event.results[event.results.length - 1][0].transcript);
      setIsListening(false);
      speech.stop();
    };
  }, []);

  return {
    text,
    isListening,
    listen,
    voiceSupported: speech !== null,
  };
};

export default useVoice;
