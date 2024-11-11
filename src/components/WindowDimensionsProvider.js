import PropTypes from 'prop-types'
import React, { createContext, useContext, useState } from 'react'

export const WindowDimensionsCtx = createContext(null)

const windowDims = () => ({
    height: window.innerHeight,
    width: window.innerWidth,
})

const WindowDimensionsProvider = ({ children }) => {
    const [dimensions, setDimensions] = useState(windowDims())

    return (
        <WindowDimensionsCtx.Provider value={dimensions}>
            {children}
        </WindowDimensionsCtx.Provider>
    )
}

WindowDimensionsProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default WindowDimensionsProvider

export const useWindowDimensions = () => {
    return useContext(WindowDimensionsCtx)
}