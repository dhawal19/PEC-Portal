import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../features/auth/authSlice";
import { useState } from "react";
import axios from 'axios';

export const useVerify = () => {
    const [verify, setVerify] = useState(false);
    const token = useSelector(selectToken);    
    useEffect(() => {
        const verifyToken = async () => {
            try{
                const res = await axios.get('http://localhost:3000/verify', {
                    headers: {
                        'authorization': `Bearer ${token}`
                    },
                })
                if(res.status === 200)
                    setVerify(true);

            }
            catch(err){
                console.log(err);
            }
        }
        verifyToken();
    
    }, [token]);
    return verify;
}