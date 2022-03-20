import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent
} from 'typeorm'
import { Item } from '@lib/models'

@EventSubscriber()
export class ItemSubscriber implements EntitySubscriberInterface<Item> {
  constructor(connection: Connection) {
    connection.subscribers.push(this)
  }

  afterInsert(event: InsertEvent<Item>) {
    console.log(`AFTER ITEM INSERTED: `, event.entity)
    // tell transactions microservice to go fetch transactions for item
  }
}
