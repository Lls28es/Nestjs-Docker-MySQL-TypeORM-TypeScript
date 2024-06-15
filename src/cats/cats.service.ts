import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './entities/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';
// import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>
  ) {}

  async create(createCatDto: CreateCatDto) {
    try {
      const cat = this.catsRepository.create({
        ...createCatDto,
        dateModified: new Date(),
      });
      return await this.catsRepository.save(cat);
    } catch (error) {
      console.warn(error);
    }
  }

  async findAll() {
    try {
      return await this.catsRepository.find();
    } catch (error) {
      console.warn(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.catsRepository.findOneBy({ id });
    } catch (error) {
      console.warn(error);
    }
  }

  // async update(id: number, updateCatDto: UpdateCatDto) {
  //   try {
  //     return `This action updates a #${id} cat`;
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // }

  // async remove(id: number) {
  //   try {
  //     return `This action removes a #${id} cat`;
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // }
}
