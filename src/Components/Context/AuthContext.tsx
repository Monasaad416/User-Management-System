import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState, ReactNode } from "react";

// Define the shape of the decoded token
interface DecodedToken {
   firstName: string;
   lastName: string;
   image: string;
   email: string;
   gender: string;

}

// Define the context type
interface AuthContextType {
    getUserToken: () => void;
    userData: DecodedToken | null; // To hold the decoded token data
}

// Create the context with a default value
export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextProviderProps {
    children: ReactNode; // Define the type for children
}

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [userData, setUserData] = useState<DecodedToken | null>(null);

    const getUserToken = () => {
        const encodedUserToken = localStorage.getItem("userAccessToken");
        if (encodedUserToken) {
            try {
                const decodedUserToken = jwtDecode<DecodedToken>(encodedUserToken);
                console.log(decodedUserToken);
                setUserData(decodedUserToken);
            } catch (error) {
                console.error("Invalid token:", error);
                setUserData(null); // Clear user data on error
            }
        }
    };

    useEffect(() => {
        if (localStorage.getItem("userAccessToken")) {
            getUserToken();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ getUserToken, userData }}>
            {children}
        </AuthContext.Provider>
    );
}