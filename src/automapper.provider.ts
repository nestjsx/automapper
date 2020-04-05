import { AutoMapper } from '@nartc/automapper';
import { Provider } from '@nestjs/common';
import { AutomapperModuleRootOptions } from './interfaces';
import { getMapperToken } from './utils/getMapperToken';
import { MapperMap } from './utils/mapperMap';

/**
 *
 * @deprecated Will be removed soon
 */
export const forRootProviders = (
  mapper: AutoMapper,
  options?: AutomapperModuleRootOptions
): Provider[] => {
  const token = getMapperToken(options ? options.name : '');
  !MapperMap.has(token) && MapperMap.set(token, mapper);

  return [
    {
      provide: token,
      useValue: mapper,
    },
  ];
};

export const withMapperProviders = (
  mapper: AutoMapper,
  name: string
): Provider[] => {
  const token = getMapperToken(name);
  !MapperMap.has(token) && MapperMap.set(token, mapper);

  return [
    {
      provide: token,
      useValue: mapper,
    },
  ];
};
