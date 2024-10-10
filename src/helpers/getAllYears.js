import axios from "axios";


export const getAllYears = async () => {

    try{
        const response = await axios.get(`http://localhost/car-test/get-years.php`); 
        const filteredResponse = response.data.data.map( year => year.manufacturingYear)
        return filteredResponse
    }catch(e){
        return e;
    }


}