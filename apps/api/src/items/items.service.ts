import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { ItemSchema } from './item.entity'
import { Item } from '@lib/models'

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemSchema)
    private itemsRepository: Repository<Item>
  ) {}

  findAll(userId: string): Promise<Item[]> {
    return this.itemsRepository.find({ where: { userId } })
  }

  findById(itemId: string): Promise<Item> {
    return this.itemsRepository.findOneBy({ id: itemId })
  }

  findByPlaidId(plaidId: string): Promise<Item> {
    return this.itemsRepository.findOne({ where: { plaidId } })
  }

  create(item: Item): Promise<Item> {
    console.log(item)
    return this.itemsRepository.save(item)
  }

  delete(itemId: string): Promise<DeleteResult> {
    return this.itemsRepository.delete({ id: itemId })
  }

  updateCursor(itemId: string, lastCursor: string): Promise<UpdateResult> {
    return this.itemsRepository.update({ plaidId: itemId }, { lastCursor })
  }
}
