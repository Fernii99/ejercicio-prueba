import axios from "axios";


export const getGOTCharacters = async (id) => {
    try{
        const response = await axios.get(`http://localhost:8000/api/characters/got`);
        if (response.status === 200){
            return response.data
        }else {
            return 0;
        }
    }catch(e){
        return e;
    }
}