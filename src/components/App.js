import { useDataQuery } from '@dhis2/app-runtime';
import i18n from '@dhis2/d2-i18n';
import { useCachedDataQuery } from '@dhis2/analytics';
import React, { useEffect, useState } from 'react';
import './styles/App.css';
import JupyterPlugin from './JupyterPlugin';

const App = () => {
    const { currentUser } = useCachedDataQuery();
    const user_id = currentUser?.id;
    const organisations = currentUser?.organisationUnits;
    const school_id = organisations?.map(obj => Object.values(obj)[0]);
    const base_url = localStorage.getItem('DHIS2_BASE_URL');

    const [apiToken, setApiToken] = useState(null);

    // Function to create an API token
    const createApiToken = async () => {
        const url = base_url + '/api/apiToken';
        const credentials = btoa('admin:district'); // TODO: change to username:password 
        const data = {

        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${credentials}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to create API token');
            }

            const result = await response.json();
            if (response.ok && result?.response?.key) {
              setApiToken(result.response.key);
          } else {
              console.error('Error creating API token:', result);
          }
        } catch (error) {
          console.error('There was a problem with the request:', error);
        }
    };

    useEffect(() => {
        console.log(currentUser);
        if (currentUser) {
            createApiToken();
        }
    }, [currentUser]);

    return (
      <>
          {apiToken ? (
              <JupyterPlugin user_id={user_id} school_id={school_id} apiToken={apiToken} />
          ) : (
              <p>Loading Jupyter...</p>
          )}
      </>
  );
};

export default App;
