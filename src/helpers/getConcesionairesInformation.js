import axios from "axios";


export const getConcesionairesInformation = async () => {
    try{
        const response = await axios.get(`http://localhost:8000/api/concessionaires`); 
       console.log(response.data)
        return response.data
    }catch(e){
        return e;
    }
}