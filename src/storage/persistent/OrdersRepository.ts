import { Repository } from 'typeorm'
import { Order } from 'src/domain'

export class OrdersRepository extends Repository<Order> {}
