import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";

export default function MicButton({ listening, onClick }) {
    return (
        <IconButton
            sx={{ display: 'flex', flexDirection: 'column', p: 2 }}
            color="primary"
            onClick={onClick}
        >
            {listening ?
                <MicIcon fontSize='large' />
                : <MicOffIcon fontSize='medium' />
            }
            <Typography>{listening ? 'Ouvindo...' : ''}</Typography>
        </IconButton>
    )
}