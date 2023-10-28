import {
  BeforeInsert,
  AfterRemove,
  BeforeUpdate,
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { File } from '../files/file.entity';

export enum role {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: role,
    default: role.ADMIN,
  })
  role: role;

  @OneToOne(() => File)
  @JoinColumn()
  image: File;

  @Column({ default: false })
  isDeleted: boolean;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @BeforeInsert()
  logInsert() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  logUpdate() {
    this.updatedAt = new Date();
    console.log('this');
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.id);
  }
}
