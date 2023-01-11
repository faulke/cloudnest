import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent
} from 'typeorm'
import { Item } from '@lib/models'

@EventSubscriber()
export class ItemSubscriber implements EntitySubscriberInterface<Item> {
  constructor(
    datasource: DataSource
  ) {
    datasource.subscribers.push(this)
  }

  afterInsert(event: InsertEvent<Item>) {
    console.log(`AFTER ITEM INSERTED: `, event.entity)
  }
}
