import { Form } from 'antd';
import React from 'react';

function GlobalForm({ children }) {
    const onFormChange = (formName, info) => {
        console.log("🚀 ~ onFormChange ~ formName, info:", formName, info)
    };
    return (
        <Form.Provider onFormChange={onFormChange}>
            {children}
        </Form.Provider>
    );
}

export default GlobalForm;