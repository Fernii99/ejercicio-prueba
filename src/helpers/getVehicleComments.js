import axios from "axios";


export const GetVehicleComments = async (id) => {
    try{
        const response = await axios.get(`http://localhost:8000/api/comments/`+ id); 
        if(response.data.status == "error"){
            return []
        }else {
            return response.data
        }
        
    }catch(e){
        return e;
    }
}