import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 30, nullable: false, comment: 'email info' })
  public email: string;

  @Column({ type: 'varchar', length: 20, nullable: false, comment: 'name info' })
  public name: string;

  constructor(email: string, name: string) {
    this.email = email;
    this.name = name;
  }
}
