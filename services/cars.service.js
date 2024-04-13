    import { BehaviorSubject } from 'rxjs';

    export const carService = {
    cars: new BehaviorSubject([]),
    get carsValue() { return this.cars.value },
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    };

    async function getAll() {
    const response = await fetchWrapper.get(`${publicRuntimeConfig.apiUrl}/cars`); // Replace with your car API endpoint
    const cars = response.data; // Assuming the response contains data in a 'data' property
    carService.cars.next(cars); // Update the BehaviorSubject with fetched cars
    return cars; // Optionally return the fetched cars
    }

    async function getById(id) {
    const response = await fetchWrapper.get(`${publicRuntimeConfig.apiUrl}/cars/${id}`);
    const car = response.data; // Assuming the response contains data in a 'data' property
    return car;
    }

    async function create(car) {
    const response = await fetchWrapper.post(`${publicRuntimeConfig.apiUrl}/cars`, car);
    const newCar = response.data; // Assuming the response contains data in a 'data' property
    carService.cars.next([...carService.carsValue, newCar]); // Update the BehaviorSubject with the new car
    return newCar; // Optionally return the created car
    }

    async function update(id, updatedCar) {
    const response = await fetchWrapper.put(`${publicRuntimeConfig.apiUrl}/cars/${id}`, updatedCar);
    const updatedData = response.data; // Assuming the response contains data in a 'data' property
    const updatedCars = carService.carsValue.map(car => car.id === id ? updatedData : car);
    carService.cars.next(updatedCars); // Update the BehaviorSubject with updated cars
    }

    async function _delete(id) {
    await fetchWrapper.delete(`${publicRuntimeConfig.apiUrl}/cars/${id}`);
    const updatedCars = carService.carsValue.filter(car => car.id !== id);
    carService.cars.next(updatedCars); // Update the BehaviorSubject with the car removed
    }
