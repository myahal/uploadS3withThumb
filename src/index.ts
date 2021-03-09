import express, {Request, Response} from 'express'
import {multerUploader} from './multer-uploader'

const app = express()

app.post('/', multerUploader().fields([{name: 'image'}, {name: 'image2'}, {name: 'prof_movie'}]), (req: Request, res: Response) => {
  console.log(JSON.stringify(req.files))
  return res.send('Successfully upload ')
})

app.listen(3000, () => {
  console.log('Listen on port 3000')
})

export default app