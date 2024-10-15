import axios from 'axios'

export const updateVehicle = async (id, vehicle) => {
    const response = await axios.put(`http://localhost:8000/api/cars/update/${id}`, vehicle, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    console.log(response);
    return response.data;
}
