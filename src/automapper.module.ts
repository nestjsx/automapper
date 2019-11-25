import { AutoMapper } from '@nartc/automapper';
import { DynamicModule, Global, Logger, Module } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common/interfaces';
import { AutomapperExplorer } from './automapper.explorer';
import { forRootProviders } from './automapper.provider';
import { AutomapperModuleRootOptions } from './interfaces';
import { MAPPER_MAP, MapperMap } from './utils/mapperMap';
import { PROFILE_MAP, ProfileMap } from './utils/profileMap';

@Global()
@Module({})
export class AutomapperModule implements OnModuleInit {
  private static readonly logger: Logger = new Logger('AutomapperModule');

  /**
   * Initialize an AutoMapper instance with a name. Default to "default"
   *
   * Generally, `forRoot` only needs to be ran once to provide a singleton for the whole application
   *
   * @param {AutomapperModuleRootOptions} options
   */
  static forRoot(options?: AutomapperModuleRootOptions): DynamicModule {
    const mapper = new AutoMapper();

    options && options.config && mapper.initialize(options.config);
    const providers = forRootProviders(mapper, options);

    return {
      module: AutomapperModule,
      providers: [
        ...providers,
        AutomapperExplorer,
        { provide: PROFILE_MAP, useValue: ProfileMap },
        { provide: MAPPER_MAP, useValue: MapperMap },
        { provide: Logger, useValue: this.logger },
      ],
      exports: providers,
    };
  }

  constructor(private readonly explorer: AutomapperExplorer) {}

  onModuleInit(): void {
    this.explorer.explore();
  }
}
