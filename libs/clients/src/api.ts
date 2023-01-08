import { ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'

export const API_SERVICE = 'API_SERVICE'

export const ApiClient = ClientsModule.registerAsync(
  [
    {
      name: API_SERVICE,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('API_HOST'),
            port: configService.get<number>('API_MS_PORT')
          }
        }
      }
    }
  ]
)
