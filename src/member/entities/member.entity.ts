
import { randomInt } from 'crypto';
import { Factory } from 'nestjs-seeder';
import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('members')
@Index("idx_team_id", ["teamId"], { unique: false }) 
export class Member  {
    @PrimaryGeneratedColumn()
    id: number;

    @Factory(() => randomInt(1, 100000))
    @Column({
        name: 'team_id',
        unique:false,
    })
    teamId: number;

    // @Factory((faker) => faker.person.fullName())
    // @Column({
    //     name: 'name',
    //     unique:true,
    // })
    // name: string;

    @Column({
        name: 'is_staff',
        default: false,
    })
    isStaff: boolean;

}
