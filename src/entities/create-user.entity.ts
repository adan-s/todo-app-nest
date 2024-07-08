import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from './create-task.entity';
import { Category } from './create-category.entity';
@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @OneToMany(() => Category, category => category.user)
    categories!: Category[];

    @OneToMany(() => Task, task => task.user)
    tasks!: Task[];
}
