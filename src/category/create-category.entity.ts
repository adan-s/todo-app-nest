import { Task } from 'src/task/create-task.entity';
import { Users } from 'src/user/create-user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

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
