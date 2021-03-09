import * as AWS from 'aws-sdk'
import { StorageEngine } from 'multer'

interface Options {
  s3: AWS.S3;
  bucket: ((req: Express.Request, file: Express.Multer.File, callback: (error: any, bucket?: string) => void) => void) | string;
  key?(req: Express.Request, file: Express.Multer.File, callback: (error: any, key?: string) => void): void;
  acl?: ((req: Express.Request, file: Express.Multer.File, callback: (error: any, acl?: string) => void) => void) | string;
  contentType?(req: Express.Request, file: Express.Multer.File, callback: (error: any, mime?: string, stream?: NodeJS.ReadableStream) => void): void;
  metadata?(req: Express.Request, file: Express.Multer.File, callback: (error: any, metadata?: any) => void): void;
  cacheControl?: ((req: Express.Request, file: Express.Multer.File, callback: (error: any, cacheControl?: string) => void) => void) | string;
  serverSideEncryption?: ((req: Express.Request, file: Express.Multer.File, callback: (error: any, serverSideEncryption?: string) => void) => void) | string;
  shouldTransform?: ((req: Express.Request, file: Express.Multer.File, callback: (error: any, key: boolean) => void) => void) | string;
  transforms: { id: string; contentType?: any;  key: any; transform: any; }[]
}

interface S3Storage {
  (options?: Options): StorageEngine;

  AUTO_CONTENT_TYPE(
    req: Express.Request,
    file: Express.Multer.File,
    callback: (error: any, mime?: string, stream?: NodeJS.ReadableStream) => void): void;
  DEFAULT_CONTENT_TYPE(
    req: Express.Request,
    file: Express.Multer.File,
    callback: (error: any, mime?: string) => void): void;
}

declare const s3Storage: S3Storage
export = s3Storage

