import axios from "axios";


export const GetVehicleInformation = async (id, brand_id) => {
    try{
        const response = await axios.get(`http://localhost:8000/api/cars/${id}`); 
        return response.data
    }catch(e){
        return e;
    }
}