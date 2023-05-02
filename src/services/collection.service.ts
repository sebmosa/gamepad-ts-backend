import Collection from '../models/Collection.js'
import { User } from '../models/User.js'

export class CollectionService {
  static async addGame(userId: string, gameId: string, gameName: string, gameImage: string) {
    try {
      const owner = await User.findById(userId)

      let collection = await Collection.findOne({ owner: userId })

      if (!collection) {
        collection = new Collection({
          owner,
          games: [
            {
              _id: gameId,
              image: gameImage,
              name: gameName,
            },
          ],
        })

        await collection.save()
      } else {
        const gameExist = await Collection.findOne({
          owner: userId,
          'games._id': gameId,
        })

        if (gameExist) {
          console.log('This game is already present.')
        } else {
          collection.games.push({
            _id: gameId,
            image: gameImage,
            name: gameName,
          })

          await collection.save()
        }
      }

      return collection
    } catch (error) {
      console.error(error)
    }
  }

  static async removeGame(userId: string, gameId: string) {
    try {
      const owner = await User.findById(userId)
      const collection = await Collection.findOne({ owner: userId })

      if (owner && collection) {
        const gameIndex = collection.games.findIndex((game) => game._id === gameId)

        if (gameIndex !== -1) {
          collection.games.splice(gameIndex, 1)
          await collection.save()
        }
      } else {
        console.log('Owner or Collection not found. No game removed.')
      }

      return collection
    } catch (error) {
      console.error(error)
    }
  }

  static async getCollection(userId: string) {
    try {
      const collection = await Collection.findOne({ owner: userId })
      return collection
    } catch (error) {
      console.error(error)
    }
  }
}
