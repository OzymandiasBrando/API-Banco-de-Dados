import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(cors())
app.use(express.json())


app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            order: req.body.order,
            imei: req.body.imei,
            express: req.body.express,
            user: req.body.user,
            date: req.body.date
        }
    })

    res.status(201).json(req.body)
})

app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            order: req.body.order,
            imei: req.body.imei,
            express: req.body.express,
            user: req.body.user,
            date: req.body.date
        }
    })

    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ message: 'Usuário foi deletado' })

})

app.get('/usuarios', async (req, res) => {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
})

app.listen(process.env.PORT || 3000, "0.0.0.0", () =>
    console.log("Servidor rodando...")
)
