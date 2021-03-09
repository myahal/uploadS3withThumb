import AWS from 'aws-sdk'
import multer from 'multer'
import S3Storage from 'veritas-s3-transform'
import sharp from 'sharp'

import {getS3Bucket} from './config'

export const multerUploader = (): multer.Multer => {
  const s3Bucket = getS3Bucket()
  if (s3Bucket == null) {
    throw new Error('config s3Bucket is undefined')
  }
  const s3 = new AWS.S3({
    region: 'ap-northeast-1' 
  })
  const storageS3 = S3Storage({
    s3: s3,
    bucket: s3Bucket,

    metadata: function (req: Express.Request, file: Express.Multer.File, cb: (error: null, metadata?: {[key:string]: string}) => void) {
      cb(null, {fieldName: file.fieldname})
    },

    contentType: function (req: Express.Request, file: Express.Multer.File, cb: (error: null, mime?: string, stream?: NodeJS.ReadableStream) => void) {
      cb(null, file.mimetype)
    },

    key: function (req: Express.Request, file: Express.Multer.File, cb: (error: null, key?: string) => void) {
      cb(null, Date.now().toString() + file.originalname)
    },

    shouldTransform: function (req: Express.Request, file: Express.Multer.File, cb: (error: null, key: boolean) => void) {
      cb(null, file.fieldname == 'image2')
    },
    
    transforms: [
      {
        id: 'original',
        key: function (req: Express.Request, file: Express.Multer.File, cb: (error: null, key?: string) => void) {
          cb(null, Date.now().toString() + file.originalname)
        },
        transform: function (req: Express.Request, file: Express.Multer.File, cb: (error: null, key?: sharp.Sharp) => void) {
          cb(null, sharp())
        }
      },
      {
        id: 'thumbnail',
        key: function (req: Express.Request, file: Express.Multer.File, cb: (error: null, key?: string) => void) {
          cb(null, Date.now().toString() + 'thumb'  + file.originalname)
        },
        transform: function (req: Express.Request, file: Express.Multer.File, cb: (error: null, key?: sharp.Sharp) => void) {
          cb(null, sharp().resize(100, 100))
        }
      }
    ]
  })

  return multer({
    storage: storageS3
  })
}