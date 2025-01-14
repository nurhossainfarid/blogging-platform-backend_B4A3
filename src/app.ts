import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/routes'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import NotFound from './app/middlewares/notFound'
const app: Application = express()

// parser
app.use(express.json())
app.use(cors())

// Application routes
app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Blogging!')
})

app.use(globalErrorHandler)
app.use(NotFound)

export default app
