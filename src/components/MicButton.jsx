import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MicIcon from "@mui/icons-material/Mic";

export default function MicButton({ listening, onClick }) {
    return (
        <IconButton
            sx={{ display: 'flex', flexDirection: 'column', p: 2 }}
            color="primary"
            onClick={onClick}
        >
            {listening ?
                <MicIcon fontSize='large' color="error" />
                : <MicIcon fontSize='large' color="disabled" />
            }
            <Typography 
                color={ listening ? "error" : "gray" }
            >
                {listening ? 'Ouvindo...' : 'Toque Para Falar'}
            </Typography>
        </IconButton>
    )
}