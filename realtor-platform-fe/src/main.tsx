import axios from "axios";
import { useEffect, useState } from "react";

export function useUser(){
    const [user, setUser] = useState([]);

    async function fetchUsers() {
        try {
            const response = await axios.get('http://localhost:3001/user');
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
      }
    
    useEffect(() => {
        fetchUsers();
    }, []);
    return {user}
}
