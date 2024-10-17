import axios from "axios";

export const getCommentsInformation = async (id) => {
    try{
        const response = await axios.get(`http://localhost:8000/api/concessionaire/${id}/comments`); 
        return response.data
    }catch(e){
        return e;
    }
}