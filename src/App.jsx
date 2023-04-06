import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './App.css';
import { api } from './services/api';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import MicButton from './components/MicButton';
import { Button } from '@mui/material';

function App() {
  const {
    browserSupportsSpeechRecognition,
    listening,
    resetTranscript,
    transcript,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Your Browser not Suport this API</span>
  }

  const handleListeningAudio = () => {
    if (!listening) {
      SpeechRecognition.startListening();
    } else {
      SpeechRecognition.stopListening();
    }
  }

  const sendRequestToChatGPT = async () => {
    if (transcript) {
      const { data } = await api.post('completions', {
        prompt: `${transcript}, Resuma tudo em até 200 palavras ou menos`,
        model: "text-davinci-003",
        max_tokens: 200,
        temperature: 0.5,
      });

      startSpeakText(data.choices[0].text.trim());
      resetTranscript();
    }
  }

  const startSpeakText = (textToSay) => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    const toSpeak = new SpeechSynthesisUtterance();
    toSpeak.voice = voices[0];
    toSpeak.text = textToSay.replace(/\n/g, '');
    toSpeak.lang = 'pt-BR';

    synth.speak(toSpeak);
  }

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Typography>{transcript}</Typography> <br />

      <MicButton
        listening={listening}
        onClick={handleListeningAudio}
      />

      {transcript &&
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={sendRequestToChatGPT}
          sx={{ mt: 5 }}
        >
          Send
        </Button>}
    </Box>
  )
}

export default App;
