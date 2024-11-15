import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers/index.js'

const configureStore = (dataEngine) => {
    const middleware = [thunk.withExtraArgument(dataEngine)]

    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    if (
        !window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        process.env.NODE_ENV !== 'production'
    ) {
        middleware.push(createLogger())
    }

    return createStore(
        reducer,
        composeEnhancers(applyMiddleware(...middleware))
    )
}

export default configureStore