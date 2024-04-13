import { apiHandler, carsRepo } from 'helpers/api'; // Assuming carsRepo handles car data

export default apiHandler({
  get: getAll,
});

async function getAll(req, res) {
  const cars = await carsRepo.getAll(); // Use carsRepo to fetch all cars
  return res.status(200).json(cars);
}
