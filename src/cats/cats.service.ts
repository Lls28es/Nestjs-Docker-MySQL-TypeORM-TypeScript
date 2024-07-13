import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './entities/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>
  ) {}

  async create(createCatDto: CreateCatDto) {
    try {
      return await this.catRepository.save(createCatDto);
    } catch (error) {
      console.warn(error);
    }
  }

  async findAll() {
    try {
      return await this.catRepository.find();
    } catch (error) {
      console.warn(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.catRepository.findOneBy({ id });
    } catch (error) {
      console.warn(error);
    }
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    try {
      return await this.catRepository.update(id, updateCatDto);
    } catch (error) {
      console.warn(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.catRepository.softDelete({ id });
    } catch (error) {
      console.warn(error);
    }
  }
}
