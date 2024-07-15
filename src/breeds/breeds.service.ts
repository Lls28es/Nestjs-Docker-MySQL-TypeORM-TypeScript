import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Breed } from './entities/breed.entity';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';

@Injectable()
export class BreedsService {
  constructor(
    @InjectRepository(Breed)
    private breedRepository: Repository<Breed>
  ) {}

  async create(createBreedDto: CreateBreedDto) {
    try {
      return await this.breedRepository.save(createBreedDto);
    } catch (error) {
      console.warn(error);
    }
  }

  async findAll() {
    try {
      return await this.breedRepository.find();
    } catch (error) {
      console.warn(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.breedRepository.findOneBy({ id });
    } catch (error) {
      console.warn(error);
    }
  }

  async update(id: number, updateBreedDto: UpdateBreedDto) {
    try {
      return await this.breedRepository.update(id, updateBreedDto);
    } catch (error) {
      console.warn(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.breedRepository.softDelete({ id });
    } catch (error) {
      console.warn(error);
    }
  }
}
