import React from 'react';
import { useData } from './context/DataContext';

function Travel() {
    const {data={}, setData} = useData();
    return (
        <div>
            {JSON.stringify(data, null, 2)}
        </div>
    );
}

export default Travel;