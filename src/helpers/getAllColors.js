import axios from "axios";


export const getAllColors = async () => {

    try{
        const response = await axios.get(`http://localhost/car-test/get-colors.php`); 
        const filteredResponse = response.data.data.map( brand => brand.color)
        return filteredResponse
    }catch(e){
        return e;
    }


}