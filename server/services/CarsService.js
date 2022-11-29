import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"



class CarsService {
  async update(carId, carData) {
    const original = await dbContext.Cars.findById(carId)
    if (!original) throw new BadRequest('no car at id: ' + carId)

    //NOTE if you don't want them to change it just don't include it here
    // original.make = carData.make ? carData.make : original.make
    // original.model = carData.model ? carData.model : original.model
    original.price = carData.price !== undefined ? carData.price : original.price
    original.imgUrl = carData.imgUrl ? carData.imgUrl : original.imgUrl
    original.year = carData.year ? carData.year : original.year
    original.description = carData.description ? carData.description : original.description
    original.color = carData.description ? carData.color : original.color

    await original.save()
    return original
  }
  async remove(carId) {
    // const car = await dbContext.Cars.findByIdAndRemove(carId) this is okay, this will delete it 
    const car = await dbContext.Cars.findById(carId)
    if (!car) throw new BadRequest('no car at id: ' + carId)
    await car.remove() // another way to remove a document
    return `deleted ${car.make} ${car.model}`
  }
  async create(carData) {
    const newCar = await dbContext.Cars.create(carData)
    return newCar
  }
  async getAll(query) { // query allows people to filter through the find
    // ...........................................sort sorts by these values (- makes it ascending)
    // ...........................................limit can be used to limit results
    const cars = await dbContext.Cars.find(query).sort('-createdAt') // Find all cars
    return cars
  }

}

export const carsService = new CarsService()