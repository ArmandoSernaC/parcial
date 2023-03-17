/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/album/album.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/business-errors';
import { TrackEntity } from './track.entity';

@Injectable()
export class TrackService {
    
    constructor(
        @InjectRepository(TrackEntity)
        private readonly trackRepository: Repository<TrackEntity>, 
       
    ){}

    async createTrack(albumid:string, track: TrackEntity): Promise<TrackEntity> {
        let album: AlbumEntity;
        album.findOne(albumid)

        if(!album) {
            throw new BusinessLogicException("The album with the given id was not found",BusinessError.NOT_FOUND);
        }
        if(track.duracion > 0){
            return await this.trackRepository.save(track);
        }
        
    }

    async findAll(): Promise<TrackEntity[]> {
        return await this.trackRepository.find({ relations: ["album"] });
    }

    async findOne(id: string): Promise<TrackEntity> {
        const track: TrackEntity = await this.trackRepository.findOne({where: {id}, relations: ["album"]})
        if(!track) {
            throw new BusinessLogicException("The track with the given id was not found",BusinessError.NOT_FOUND);
        }
        return track;
    }

}
