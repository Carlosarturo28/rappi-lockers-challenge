import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Locker } from './Locker';

export enum OrderStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  DELIVERED_IN_LOCKER = 'delivered_in_locker',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true }) // Simplified for MVP, in real app would link to User entity
  userId!: string;

  @ManyToOne(() => Locker, (locker) => locker.orders)
  @JoinColumn({ name: 'lockerId' })
  locker!: Locker;

  @Column({ nullable: true }) // Foreign key to Locker
  lockerId!: string;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status!: OrderStatus;

  @Column({ nullable: true })
  slotNumber!: string;

  @Column({ nullable: true })
  accessCode!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;

  @Column({ type: 'timestamp', nullable: true })
  deliveredAt!: Date; // When courier marked as delivered to locker
}
