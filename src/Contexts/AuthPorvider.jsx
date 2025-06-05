import React from 'react';
import { AuthContext } from './AuthContext';

const AuthPorvider = ({children}) => {

    const authInfo = {
        
    }
    return (
        <AuthContext>
            {children}
        </AuthContext>
    );
};

export default AuthPorvider;