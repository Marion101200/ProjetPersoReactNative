import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [utilisateur, setUtilisateur] = useState(null);

    return (
        <AuthContext.Provider value={{
            utilisateur,
            setUtilisateur
        }}>
            {children}
        </AuthContext.Provider>
    );
};