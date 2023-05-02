import { Document, Model, model, Schema } from 'mongoose'
import { IUser } from './User.js'

interface ICollection extends Document {
  games: [
    {
      _id: string
      image: string
      name: string
    }
  ]
  owner: IUser
}

const collectionSchema: Schema<ICollection> = new Schema(
  {
    games: {
      type: [{}],
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

const Collection: Model<ICollection> = model<ICollection>('Collection', collectionSchema)

export default Collection
