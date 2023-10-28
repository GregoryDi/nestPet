import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  AfterRemove,
  BeforeUpdate,
} from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  contentType: string;

  @Column()
  contentLength: number;

  url: string;

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
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.id);
  }
}
