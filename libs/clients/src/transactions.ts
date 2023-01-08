import { ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'

export const TRANSACTIONS_SERVICE = 'TRANSACTIONS_SERVICE'

export const TransactionsClient = ClientsModule.registerAsync(
  [
    {
      name: TRANSACTIONS_SERVICE,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('TRANSACTIONS_HOST'),
            port: configService.get<number>('TRANSACTIONS_MS_PORT')
          }
        }
      }
    }
  ]
)
