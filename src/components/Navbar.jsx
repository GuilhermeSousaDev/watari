import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  overflow: 'scroll',
  boxShadow: 24,
  p: 2,
};

export default function Navbar({ setSpeakConfig }) {
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();

  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelectAndTestVoice = (index, voice) => {
    const toSpeak = new SpeechSynthesisUtterance();
    toSpeak.text = `Voz ${index+1}`;
    toSpeak.voice = voice;
    toSpeak.lang = voice.lang;

    synth.speak(toSpeak);
    setSelectedIndex(index);
    setSpeakConfig(voice);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Modal
        open={isShowModal}
        onClose={() => setIsShowModal(false)}
      >
        <Box display="flex" flexDirection="column" sx={style}>
          { voices.map((voice, index) => (
            <>
              <Button 
                variant={ selectedIndex === index ? "contained" : "default" }
                sx={{ mt: 2 }}
                onClick={() => handleSelectAndTestVoice(index, voice)}
              >
                  { voice.name }
              </Button>
            </>
          )) }
        </Box>
      </Modal>
      <AppBar position="static" color='transparent'>
        <Toolbar>
          <Typography variant="h6" component="div" color="primary" sx={{ flexGrow: 1 }}>
            Watari
          </Typography>
          <IconButton onClick={() => setIsShowModal(prev => prev ? false : true)}>
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}