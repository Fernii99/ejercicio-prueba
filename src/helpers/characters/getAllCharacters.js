import axios from "axios";


export const getAllTheCharacters = async (id) => {
    try{
        const response = await axios.get(`http://localhost:8000/api/characters/getall`);
        if (response.status === 200){
            return response.data
        }else {
            return 0;
        }
    }catch(e){
        return e;
    }
}