import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"



class HousesService {
  async update(houseId, houseData) {
    const original = await dbContext.Houses.findById(houseId)
    if (!original) throw new BadRequest('no house at id: ' + houseId + ' id')

    original.year = houseData.year !== undefined ? houseData.year : original.year
    original.bedrooms = houseData.bedrooms !== undefined ? houseData.bedrooms : original.bedrooms
    original.bathrooms = houseData.bathrooms !== undefined ? houseData.bathrooms : original.bathrooms
    original.levels = houseData.levels !== undefined ? houseData.levels : original.levels
    original.price = houseData.description !== undefined ? houseData.price : original.price
    original.description = houseData.description !== undefined ? houseData.description : original.description
    original.imgUrl = houseData.imgUrl !== undefined ? houseData.imgUrl : original.imgUrl

    await original.save()
    return original
  }
  async remove(houseId) {
    const house = await dbContext.Houses.findById(houseId)
    if (!house) throw new BadRequest('sorry no houses with ' + houseId + ' id')
    await house.remove()
    return 'deleted house with ' + houseId + ' id'
  }
  async create(newHouse) {
    const house = await dbContext.Houses.create(newHouse)
    return house
  }
  async getAll(query) {
    const houses = await dbContext.Houses.find(query)
    return houses
  }
}

export const housesService = new HousesService()