import { User } from '../utils/types';
import { createContext, useContext, useEffect, useState } from 'react';
import { loginUser, registerUser } from 'api/authService';

type AuthContext = {
    user?: User | null;
    register: (email: string) => Promise<void>;
    login: (email: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContext|undefined>(undefined);


export default function AuthProvider({ children }: { children: React.ReactNode }) {
    
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = sessionStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    
    useEffect(() => {
        if (user) {
            sessionStorage.setItem("user", JSON.stringify(user));
        } else {
            sessionStorage.removeItem("user");
        }
    }, [user]);
    
    const login = async (email: string) => {
        try {
            const response = await loginUser(email);
            setUser(response);
        }
        catch (error) {
            console.error("Login error:", error);
            throw new Error("Invalid credentials or server error.");
        }
    };

    const register = async (email: string) => {
        try {
            const response = await registerUser(email);
            setUser(response);
        }
        catch (error) {
            console.error("Register error:", error);
            throw new Error("Server error.");
        }
    };
    
    const logout = async () => {
        setUser(null);
    };
    
    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
        {children} 
        </AuthContext.Provider>
    );
}

export const useAuth = () => {  
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}