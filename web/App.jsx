import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './Routes';
import FacebookAppButton from "./components/FacebookAppButton";
import theme from './theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import {BottomNavigationProvider} from "./components/contexts/BottomNavigationContext";

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Router>
                        <BottomNavigationProvider>
                            <Routes />
                        </BottomNavigationProvider>
                    </Router>
                    <FacebookAppButton/>
                </ThemeProvider>
            </React.Fragment>
        );
    }
}

export default App;
