import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async executeSeed() {
    await this.deleteTables();
    const users = await this.insertNewUsers();
    await this.insertNewProducts(users[0]);
    return 'This action adds a new seed';
  }

  private async deleteTables() {
    await this.productsService.deleteAllProducts();
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().execute();
  }

  private async insertNewProducts(user: User) {
    const products = initialData.products;

    const insertPromises = [];
    products.forEach((product) => {
      insertPromises.push(this.productsService.create(product, user));
    });

    await Promise.all(insertPromises);
  }

  private async insertNewUsers() {
    const seedUsers = initialData.users;

    const users: User[] = [];
    seedUsers.forEach((user) => {
      const { password, ...userDate } = user;
      const newUser = this.userRepository.create({
        ...userDate,
        password: bcrypt.hashSync(password, 10),
      });
      users.push(newUser);
    });
    return await this.userRepository.save(users);
  }
}
