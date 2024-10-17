import axios from "axios";


export const getCharacters = async (id) => {

    try{
        const response = await axios.get(`http://localhost:8000/api/coffees`);
        return response.data
    }catch(e){
        return e;
    }
}