import { ValueTransformer } from 'typeorm'

export class DollarsTransformer implements ValueTransformer {
  /**
   * Convert dollars to cents before inserting in DB
   */
  to(value: number): number {
    return value * 100
  }
  /**
   * Convert cents to dollars when retrieving from DB
   */
  from(value: number): number {
    return value / 100
  }
}