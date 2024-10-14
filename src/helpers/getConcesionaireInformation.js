import axios from "axios";

export const getConcesionaireInformation = async (id) => {
    try{
        const response = await axios.get(`http://localhost:8000/api/concessionaire/${id}`); 
        console.log("response from the concesionaire retrieve")
        console.log(response.data)
        return response.data
    }catch(e){
        return e;
    }
}