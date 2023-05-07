import mongoose from 'mongoose'

async function mongoConnect() {
  const mongoURI = process.env.MONGODBURI
  try {
    await mongoose.connect(mongoURI)
  } catch (err) {
    console.log(err)
    throw err
  }
}

export default {
  mongoConnect
}
