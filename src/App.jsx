import { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './App.css';
import { useEffect } from 'react';
import { api } from './services/api';

const textstyle = {
  play: {
    hover: {
      backgroundColor: 'black',
      color: 'white'
    },
    button: {
      padding: '4',
      fontFamily: 'Helvetica',
      fontSize: '1.0em',
      cursor: 'pointer',
      pointerEvents: 'none',
      outline: 'none',
      backgroundColor: 'inherit',
      border: 'none'
    },
  }
}

function App() {
  const [text, setText] = useState(null);

  const {
    browserSupportsSpeechRecognition,
    listening,
    resetTranscript,
    transcript,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Your Browser not Suport this API</span>
  }

  const sendRequestToChatGPT = async () => {
    if (transcript) {
      const { data } = await api.post('completions', {
        prompt: transcript,
        model: "text-davinci-003",
        max_tokens: 100,
        temperature: 0,
      });

      setText(data.choices[0].text.trim());
      resetTranscript();
    }
  }

  const startSpeakText = () => {
    if (text) {
      const synth = window.speechSynthesis;
      const voices = synth.getVoices();
      const toSpeak = new SpeechSynthesisUtterance();
      toSpeak.voice = voices[0];
      toSpeak.text = text.replace(/\n/g, '');
      toSpeak.lang = 'pt-BR';

      synth.speak(toSpeak);
    }
  }

  return (
    <div className="App">
      <span>Microphone: {listening ? 'On' : 'Off'}</span>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      { transcript && <button onClick={sendRequestToChatGPT}>Request to ChatGPT</button> }
      { text && <button onClick={startSpeakText}>Speak Text</button> }
    </div>
  )
}

export default App;
