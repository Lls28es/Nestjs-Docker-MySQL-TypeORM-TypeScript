import {
  Column,
  DeleteDateColumn,
  Entity,
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

  @Column()
  dateModified: Date;

  @DeleteDateColumn()
  deletedAt: boolean;
}
