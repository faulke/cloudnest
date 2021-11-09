import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ItemSchema } from './item.entity'
import { Item } from './item.model'

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemSchema)
    private itemsRepository: Repository<Item>
  ) {}

  findAll(): Promise<Item[]> {
    return this.itemsRepository.find()
  }

  create(item: Item): Promise<Item> {
    return this.itemsRepository.save(item)
  }
}