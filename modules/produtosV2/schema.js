import { Schema, Types, model } from 'mongoose';

const produtosSchema = new Schema({
  descricao: {
    type: String,
    required: true
  },
  valor: {
    type: Number,
    required: true
  },
  marca: {
    type: String,
    required: true
  }
})

produtosSchema.virtual('id').get((value, virutal, doc) => {
  return doc._id.toString()
})

const produtoModel = model('produtos', produtosSchema)

export default produtoModel