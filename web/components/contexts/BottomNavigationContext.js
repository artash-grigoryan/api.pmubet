import React, {Component} from 'react'

const BottomNavigationContext = React.createContext()

class BottomNavigationProvider extends Component {
    // Context state
    state = {
        pathname: window.location.pathname,
        value: 0,
    }

    // Method to update state
    setPathname = (pathname) => {
        this.setState((prevState) => ({ pathname }))
    }

    setValue = (value) => {
        this.setState((prevState) => ({ value }))
    }

    render() {
        const { children } = this.props
        const { value } = this.state
        const { pathname } = this.state
        const { setValue } = this
        const { setPathname } = this

        return (
            <BottomNavigationContext.Provider
                value={{
                    value,
                    setValue,
                    pathname,
                    setPathname,
                }}
            >
                {children}
            </BottomNavigationContext.Provider>
        )
    }
}

export default BottomNavigationContext

export { BottomNavigationProvider }