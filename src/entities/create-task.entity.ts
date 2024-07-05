import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './create-user.entity';
import { Category } from './create-category.entity';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column()
    duedate!: Date;

    @Column()
    status!: string;

    @ManyToOne(() => Users, user => user.tasks, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user!: Users;

    @Column()
    user_id!: number;

    @ManyToOne(() => Category, category => category.tasks, { eager: true })
    @JoinColumn({ name: 'category_id' })
    category!: Category;

    @Column()
    category_id!: number;
}
