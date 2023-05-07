import { Router } from 'express'
import mongoose from 'mongoose'
import produtosModel from './schema.js'
const router = Router()

router.get('/', async (req, res) => {
  const produtos = await produtosModel.find({}).lean()
  res.status(200).json({produtos})
})

router.get('/:id', async  (req, res) => {
  const id = req.params.id

  const produto = await produtosModel.findById(id)
  if (!produto) return res.status(400).json({message: 'produto não encontrado'})
  res.status(200).json({
    produto
  })
})

router.post('/', async (req, res) => {
  const { descricao, valor, marca } = req.body

  const produto = {
    descricao, valor, marca
  }

  const insertProduto = await produtosModel(produto).save()
  res.status(201).json({message: 'Produto adicionado com sucesso', insertProduto})
})

router.put('/:id', async (req, res) => {
  const { descricao, valor, marca } = req.body
  const id = req.params.id
  
  await produtosModel.findByIdAndUpdate(id, { descricao, valor, marca })

  res.status(201).json({message: 'Produto modificado com sucesso'})
})

router.delete('/:id', async (req, res) => {
  const _id = new mongoose.Types.ObjectId(req.params.id)

  console.log(_id)

  await produtosModel.deleteOne({_id})

  res.status(201).json({message: 'Produto removido com sucesso'})
})

export default router