import { CachedDataQueryProvider } from '@dhis2/analytics'
import { useDataEngine } from '@dhis2/app-runtime'
import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import App from './components/App.js'
import configureStore from './configureStore.js'
import WindowDimensionsProvider from './components/WindowDimensionsProvider.js'

import './locales/index.js'

const d2Config = {
    schemas: [],
}


const authorization = process.env.REACT_APP_DHIS2_AUTHORIZATION || null
if (authorization) {
    d2Config.headers = { Authorization: authorization }
}

const query = {
    rootOrgUnits: {
        resource: 'organisationUnits',
        params: {
            fields: 'id,displayName,name',
            userDataViewFallback: true,
            paging: false,
        },
    },
    apps: {
        resource: 'apps',
    },
    currentUser: {
        resource: 'me',
        params: {
            fields: 'id,username,displayName~rename(name),organisationUnits',
        },
    },
}

const providerDataTransformation = ({ rootOrgUnits, apps, currentUser }) => {
    const lineListingApp = apps.find((app) => app.key === 'line-listing') || {}
    return {
        rootOrgUnits: rootOrgUnits.organisationUnits,
        lineListingAppVersion: lineListingApp.version || '0.0.0',
        currentUser,
        apps,
    }
}

const AppWrapper = () => {
    const dataEngine = useDataEngine()

    return (
        <ReduxProvider store={configureStore(dataEngine)}>
            <CachedDataQueryProvider
                query={query}
                dataTransformation={providerDataTransformation}
            >
                <WindowDimensionsProvider>
                    <App />
                </WindowDimensionsProvider>
            </CachedDataQueryProvider>
        </ReduxProvider>
    )
}

export default AppWrapper