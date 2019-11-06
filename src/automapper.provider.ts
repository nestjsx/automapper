import { AutoMapper } from '@nartc/automapper';
import { Provider } from '@nestjs/common';
import {
  AutomapperModuleFeatureOptions,
  AutomapperModuleRootOptions,
} from './interfaces';
import { getMapperToken } from './utils/getMapperToken';
import { MAPPER_MAP, MapperMap } from './utils/mapperMap';

export const forRootProviders = (
  options?: AutomapperModuleRootOptions
): Provider[] => {
  const mapper = new AutoMapper();
  const token = getMapperToken(options ? options.name : '');
  !MapperMap.has(token) && MapperMap.set(token, mapper);

  return [
    {
      provide: token,
      useValue: mapper,
    },
    {
      provide: MAPPER_MAP,
      useValue: MapperMap,
    },
  ];
};

export const forFeatureProviders = (
  options: AutomapperModuleFeatureOptions
): Provider[] => {
  const token = getMapperToken(options ? options.name : '');
  const mapper = MapperMap.has(token)
    ? (MapperMap.get(token) as AutoMapper)
    : new AutoMapper();

  options.profiles.forEach(mapper.addProfile.bind(mapper));
  !MapperMap.has(token) && MapperMap.set(token, mapper);

  return [
    {
      provide: token,
      useValue: mapper,
    },
  ];
};
