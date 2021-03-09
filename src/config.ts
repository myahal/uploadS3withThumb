import { readFileSync } from 'fs'

export interface ConfigInterface {
  readonly s3Bucket?: string;
}

let config: ConfigInterface

export const getS3Bucket = (): string | undefined => {
  if (config != null) {
    return config.s3Bucket
  }
  const env = process.env.NODE_ENV ?? 'local'
  const text = readFileSync(`config/misc/${env}.json`, 'utf-8').toString()
  const json = JSON.parse(text) as ConfigInterface
  return json.s3Bucket ?? undefined
}

