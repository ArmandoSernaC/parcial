/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/business-errors';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity';

@Injectable()
export class AlbumService {
    
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>,
    ){}

    async createAlbum(album: AlbumEntity): Promise<AlbumEntity> {
        if(album.nombre != null && album.descripcion != null){
            return await this.albumRepository.save(album);
        }
        
    }

    async findAll(): Promise<AlbumEntity[]> {
        return await this.albumRepository.find({ relations: ["tracks", "performers"] });
    }

    async findOne(id: string): Promise<AlbumEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id}, relations: ["tracks", "performers"]})
        if(!album) {
            throw new BusinessLogicException("The album with the given id was not found",BusinessError.NOT_FOUND);
        }
        return album;
    }

    async delete(id: string){
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id}});
        if(!album) 
            throw new BusinessLogicException("The album with the given id was not found",BusinessError.NOT_FOUND);
        if(album.tracks == null){
            await this.albumRepository.remove(album);
        }
       
    }
}
