import axios from "axios";


export const getAllBrands = async () => {

    try{
        const response = await axios.get(`http://localhost:8000/api/brands`);
        return response.data
    }catch(e){
        return e;
    }
}