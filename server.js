import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

// ✅ CORS dinâmico — permite acesso do GitHub Pages, localhost e qualquer domínio autorizado
const allowedOrigins = [
    'https://ozymandiasbrando.github.io',
    'http://localhost:3000'
]

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Não permitido pelo CORS'))
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}))

app.use(express.json())

// ✅ Rota básica para ver se o servidor está rodando
app.get('/', (req, res) => {
    res.json({ status: 'API online 🚀' })
})

// ✅ Rota POST - criar usuário
app.post('/usuarios', async (req, res) => {
    try {
        const novoUsuario = await prisma.user.create({
            data: {
                order: req.body.order,
                imei: req.body.imei,
                express: req.body.express,
                user: req.body.user,
                date: req.body.date
            }
        })
        res.status(201).json(novoUsuario)
    } catch (error) {
        console.error('Erro ao criar usuário:', error)
        res.status(500).json({ error: 'Erro ao criar usuário' })
    }
})

// ✅ Rota PUT - atualizar usuário
app.put('/usuarios/:id', async (req, res) => {
    try {
        const usuarioAtualizado = await prisma.user.update({
            where: { id: req.params.id },
            data: {
                order: req.body.order,
                imei: req.body.imei,
                express: req.body.express,
                user: req.body.user,
                date: req.body.date
            }
        })
        res.status(200).json(usuarioAtualizado)
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error)
        res.status(500).json({ error: 'Erro ao atualizar usuário' })
    }
})

// ✅ Rota DELETE - remover usuário
app.delete('/usuarios/:id', async (req, res) => {
    try {
        await prisma.user.delete({
            where: { id: req.params.id }
        })
        res.status(200).json({ message: 'Usuário foi deletado' })
    } catch (error) {
        console.error('Erro ao deletar usuário:', error)
        res.status(500).json({ error: 'Erro ao deletar usuário' })
    }
})

// ✅ Rota GET - listar usuários
app.get('/usuarios', async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.status(200).json(users)
    } catch (error) {
        console.error('Erro ao buscar usuários:', error)
        res.status(500).json({ error: 'Erro ao buscar usuários' })
    }
})

// ✅ Porta para Render ou local
const PORT = process.env.PORT || 3000
app.listen(PORT, '0.0.0.0', () => console.log(`Servidor rodando na porta ${PORT}...`))
