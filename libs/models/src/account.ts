import { User } from './user'

export interface Account {
	id?: string
	plaidId: string
	userId: string
	name: string
	mask: string
	officialName: string
	type: string
	subtype: string
	availableBalance: number
	currentBalance: number
	currencyCode: string
	user?: User
}
