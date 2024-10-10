import axios from "axios";


export const getAllModels = async () => {

    try{
        const response = await axios.get(`http://localhost/car-test/get-models.php`); 
        const filteredResponse = response.data.data.map( brand => brand.model)
        return filteredResponse
    }catch(e){
        return e;
    }


}