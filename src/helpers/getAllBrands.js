import axios from "axios";


export const getAllBrands = async () => {

    try{
        const response = await axios.get(`http://localhost/car-test/get-brands.php`); 
        const filteredResponse = response.data.data.map( brand => brand.brand)
        return filteredResponse
    }catch(e){
        return e;
    }


}