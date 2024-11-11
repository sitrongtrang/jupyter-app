import React, { useEffect, useRef, useState } from 'react';
import { useWindowDimensions } from './WindowDimensionsProvider';

const JupyterPlugin = ({ user_id, school_id, apiToken }) => {
    const { width, height } = useWindowDimensions();
    const [iframeSrc, setIframeSrc] = useState('');
    const token = '';

    var notebookUrl = '';
    var newNotebookUrl = '';
    if (token !== '') {
        newNotebookUrl = `https://jupyter.cohota.dev/tree/dhis2/${user_id}`;
        notebookUrl = `https://jupyter.cohota.dev/tree?token=${token}`;
        // newNotebookUrl = `https://jupyter.cohota.dev/tree?token=${token}`;
    } else {
        newNotebookUrl = `https://jupyter.cohota.dev/tree?user_id=${user_id}&school_id=${school_id}&apiToken=${apiToken}`;
        notebookUrl = `https://jupyter.cohota.dev/tree`;
    }

    useEffect(() => {
        setIframeSrc(notebookUrl);
    }, [notebookUrl]);

    const handleLoad = () => {
        setIframeSrc(newNotebookUrl);
    };

    return (
        <div>
            <iframe
                id="jupyter-iframe"
                title="JupyterNotebook"
                src={newNotebookUrl}
                width={width}
                height={height}
                style={{ border: '1px solid black' }}
                // onLoad={handleLoad}
            />
        </div>
    );
};

export default JupyterPlugin;
