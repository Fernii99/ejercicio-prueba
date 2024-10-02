import axios from "axios";
import { SearchVehicleHook } from "../hooks/searchVehicleHook";


export const getAllCars = async () => {

    try{
        console.log(" GET ALL CARS")
        const response = await axios.get(`http://localhost/car-test/get-cars.php`); 
        console.log(response.data.data)
        return response.data.data;
    }catch(e){
        console.log(e)
        return e;
    }


}