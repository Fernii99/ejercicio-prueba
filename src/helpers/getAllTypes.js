import axios from "axios";


export const getAllTypes = async () => {

    try{
        const response = await axios.get(`http://localhost/car-test/get-types.php`); 
        const filteredResponse = response.data.data.map( brand => brand.type)
        return filteredResponse
    }catch(e){
        return e;
    }


}