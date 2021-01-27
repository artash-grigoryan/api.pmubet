import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({

    palette: {
        primary: {
            main: '#016a30',
        },
        secondary: {
            main: '#da2032',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
        red: {
            main: '#da2032',
        },
        green: {
            main: '#016a30',
        }
    },
});

export default theme;