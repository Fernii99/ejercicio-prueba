import axios from "axios";
import { SearchVehicleHook } from "../hooks/searchVehicleHook";


export const GetVehicleInformation = async (id) => {
    try{
        const response = await axios.get(`http://localhost:8000/api/cars/`+ id); 
        return response.data
    }catch(e){
        return e;
    }
}