import axios from "axios";


export const getFilteredCharacters = async (filters) => {
    alert(JSON.stringify(filters))
    try{
        const response = await axios.get(`http://localhost:8000/api/characters/filtered`, {
            params: filters // Pass filters as query parameters
        });
        
        console.log(response.data);
        if (response.status === 200){
            return response.data
        }else {
            return {};
        }
    }catch(e){
        return e;
    }
}