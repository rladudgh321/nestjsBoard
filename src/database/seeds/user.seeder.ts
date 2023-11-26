

import { User } from "src/entity/user.entity";
import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { SeederFactoryManager } from "typeorm-extension/dist/seeder";

export default class UserSeeder implements Seeder {
    async run(
        dataSource: DataSource, 
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        const repository = dataSource.getRepository(User);
        
        await repository.insert([
            {
                username: 'fastcampus',
                name:'hongildong',
                password: 'fastcampus1234'
            }
        ])
    }

}