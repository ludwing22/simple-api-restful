import express from 'express'
const router = express.Router()
import { v4 as uuidv4 } from 'uuid'

const initListaProdutos = () => [
  { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
  { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
  { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
  { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
  { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  },
]

let listaProdutos = initListaProdutos()

router.get('/', (req, res) => {
  res.status(200).json({produtos: listaProdutos})
})

router.get('/:id',  (req, res) => {
  const id = req.params.id
  console.log(id)
  const produto = listaProdutos.find(produto => produto.id.toString() === id.toString())
  if (!produto) return res.status(400).json({message: 'produto não encontrado'})
  res.status(200).json({
    produto
  })
})

router.post('/', (req, res) => {
  const { descricao, valor, marca } = req.body
  const id = uuidv4()
  const produto = {
    id, descricao, valor, marca
  }
  listaProdutos.push(produto)
  res.status(201).json({message: 'Produto adicionado com sucesso', produto})
})

router.put('/:id', (req, res) => {
  const { descricao, valor, marca } = req.body
  const id = req.params.id
  let produto = listaProdutos.find(produto => produto.id.toString() === id.toString())
  const index = listaProdutos.indexOf(produto)
  listaProdutos.splice(index, 1)
  listaProdutos.push({
    ...produto,
    descricao: descricao || produto.descricao,
    valor: valor || produto.valor,
    marca: marca || produto.marca
  })
  res.status(201).json({message: 'Produto modificado com sucesso'})
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  let produto = listaProdutos.find(produto => produto.id.toString() === id.toString())
  const index = listaProdutos.indexOf(produto)
  listaProdutos.splice(index, 1)
  res.status(201).json({message: 'Produto removido com sucesso', produto})
})

export default router