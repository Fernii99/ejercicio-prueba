import axios from "axios";

export const getAllCars = async () => {
    try{
        const response = await axios.get(`http://localhost:8000/api/cars`); 
        console.log(response.data)
        return response.data;
    }catch(e){
        return e;
    }


}