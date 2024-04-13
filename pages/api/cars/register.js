import { apiHandler, carsRepo } from 'helpers/api'; // Assuming no car repo import needed

export default apiHandler({
  post: createCar, // Renamed function for clarity
});

async function createCar(req, res) {

  await carsRepo.create(req.body);
  return res.status(200).json({}); // Use status code 201 for created resources
}
