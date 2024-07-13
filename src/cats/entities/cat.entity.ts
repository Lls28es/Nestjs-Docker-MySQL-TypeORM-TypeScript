import {
  Column,
  DeleteDateColumn,
  Entity,
  UpdateDateColumn,
  // PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cat {
  // @PrimaryGeneratedColumn()
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  breead: string;

  @UpdateDateColumn({ type: 'timestamp' })
  dateModified: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
