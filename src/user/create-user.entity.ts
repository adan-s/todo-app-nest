import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from '../task/create-task.entity';
import { Category } from 'src/category/create-category.entity';

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
