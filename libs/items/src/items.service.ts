import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ItemSchema } from './item.entity'
import { Item } from '@lib/models'

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemSchema)
    private itemsRepository: Repository<Item>
  ) {}

  findAll(): Promise<Item[]> {
    return this.itemsRepository.find()
  }

  findByPlaidId(itemId: string): Promise<Item> {
    return this.itemsRepository.findOne({ where: { itemId } })
  }

  create(item: Item): Promise<Item> {
    return this.itemsRepository.save(item)
  }
}
