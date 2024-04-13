    import { db } from 'helpers/api'; // Assuming this imports the db object with Carro model

    const Car = db.Car; // Access the Carro model

    export const carsRepo = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    };

    async function getAll() {
    return await Car.find(); // Fetch all cars
    }

    async function getById(id) {
    return await Car.findById(id); // Fetch a car by ID
    }

    async function create(params) {
    // Validate car data here (e.g., required fields)
    const car = new Car(params);

//   console.log("Guardando");
    await car.save(); // Save the new car
    
    }

    async function update(id, params) {
    const car = await Car.findById(id);
    if (!car) throw 'Car not found';

    // Update car properties based on params
    // You might want to validate updates here too
    Object.assign(car, params);
    await car.save();
    return car; // Return the updated car
    }

    async function _delete(id) {
    await Car.findByIdAndRemove(id); // Delete the car by ID
    }
