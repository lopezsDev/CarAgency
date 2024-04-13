    import { apiHandler, carsRepo } from 'helpers/api'; // Assuming carsRepo handles car data

    export default apiHandler({
    get: getById,
    post: create, // Add a POST method for creating cars
    put: update,
    delete: _delete,
    });

    async function getById(req, res) {
    const car = await carsRepo.getById(req.query.id);

    if (!car) throw 'Car Not Found';

    return res.status(200).json(car);
    }

    async function create(req, res) {
    const newCar = await carsRepo.create(req.body); // Use request body for car data
    return res.status(201).json(newCar); // Use status code 201 for created resources
    }

    async function update(req, res) {
    await carsRepo.update(req.query.id, req.body);
    return res.status(200).json({}); // Consider returning the updated car if needed
    }

    async function _delete(req, res) {
    await carsRepo.delete(req.query.id);
    return res.status(200).json({});
    }
