import { Slider } from '@mui/material/';

function InputRangeVolume({ value, onChange, onMouseOver, onMouseOut }) {
    return (
        <Slider
            orientation="vertical"
            // vertical = input theo chieu` doc
            aria-label="Volume"
            value={value}
            onChange={onChange}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            sx={{
                '& .MuiSlider-thumb': {
                    width: 12,
                    height: 12,
                },
                '& .MuiSlider-thumb::after': {
                    width: 12,
                    height: 12,
                },
                width: 6,
                height: 80,
                position: 'absolute',
                top: -80,
                left: '50%',
                transform: 'translateX(-50%)',
                color: '#ccc',
            }}
        />
    );
}

export default InputRangeVolume;
