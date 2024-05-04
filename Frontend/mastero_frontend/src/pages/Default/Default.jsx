import { useEffect } from "react";
import {  useNavigate } from "react-router-dom";

const DefaultPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/signup");
    },[])
    
  return (
    <div>default</div>
  )
}

export default DefaultPage