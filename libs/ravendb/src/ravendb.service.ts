import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DocumentStore } from 'ravendb'

@Injectable()
export class RavendbService {
  private store: DocumentStore

  constructor(configService: ConfigService) {
    const host = configService.get<string>('RAVEN_HOST')
    const port = configService.get<string>('RAVEN_PORT')
    this.store = new DocumentStore(`http://${host}:${port}`, 'cloudnest')

    this.store.initialize()
  }

  async storeDocument(document: object): Promise<object> {
    const session = this.store.openSession()

    await session.store(document)
    await session.saveChanges()

    session.dispose()

    return document
  }

  async listDocuments(): Promise<object> {
    const session = this.store.openSession()
    const res = { objects: [] }
    try {
      res.objects = await session.query({}).noTracking().all()
    } catch (error) {
      console.log(error)
    }
    session.dispose()

    return res
  }
}
