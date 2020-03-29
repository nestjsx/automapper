import { AutoMapper, Constructible, MappingProfile } from '@nartc/automapper';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MAPPER_MAP } from './utils/mapperMap';
import { PROFILE_MAP } from './utils/profileMap';

@Injectable()
export class AutomapperExplorer {
  constructor(
    private readonly reflector: Reflector,
    private readonly logger: Logger,
    @Inject(MAPPER_MAP) private readonly mapperMap: Map<string, AutoMapper>,
    @Inject(PROFILE_MAP)
    private readonly profileMap: Map<
      Constructible<MappingProfile>,
      Constructible<MappingProfile>
    >
  ) {}

  explore(): void {
    if (!this.profileMap.size) {
      return;
    }

    this.profileMap.forEach(this.exploreProfile.bind(this));
  }

  private exploreProfile(value: Constructible<MappingProfile>) {
    const mapperKey = this.reflector.get<string>('AUTO_MAPPER_PROFILE', value);
    const mapper = this.mapperMap.get(mapperKey);

    if (!mapper) {
      this.logger.error(
        `There is no Mapper associated with name ${mapperKey.split('__').pop()}`
      );
      return;
    }

    this.logger.log(
      `${value.name} added to Mapper ${mapperKey.split('__').pop()}`
    );
    mapper.addProfile(value);
  }
}
