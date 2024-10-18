import axios from "axios";


export const getFuturamaCharacters = async (id) => {
    try{
        const response = await axios.get(`http://localhost:8000/api/characters/futurama`);
        if (response.status === 200){
            return response.data
        }else {
            return 0;
        }
    }catch(e){
        return e;
    }
}