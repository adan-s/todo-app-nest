
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Task } from './create-task.entity';
import { Users } from './create-user.entity';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    category_name!: string;

    @ManyToOne(() => Users, user => user.categories, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user!: Users;
    
    @OneToMany(() => Task, task => task.category)
    tasks!: Task[];

    @Column()
    user_id!: number;
}
