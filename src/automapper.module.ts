import { AutoMapper, AutoMapperGlobalSettings } from '@nartc/automapper';
import { DynamicModule, Global, Logger, Module } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common/interfaces';
import { AutomapperExplorer } from './automapper.explorer';
import { forRootProviders, withMapperProviders } from './automapper.provider';
import { AutomapperModuleRootOptions } from './interfaces';
import { getWithMapperArgs } from './utils/getWithMapperArgs';
import { MAPPER_MAP, MapperMap } from './utils/mapperMap';
import { PROFILE_MAP, ProfileMap } from './utils/profileMap';

@Global()
@Module({})
export class AutomapperModule implements OnModuleInit {
  private static readonly logger: Logger = new Logger('AutomapperModule');

  /**
   * Initialize a Mapper with name and globalSettings
   *
   * @param {string} name - name of the Mapper instance. Default to 'default'
   * @param {AutoMapperGlobalSettings} globalSettings - Global Settings for the current Mapper instance
   */
  static withMapper(
    name?: string,
    globalSettings?: AutoMapperGlobalSettings & { dev?: boolean }
  ): DynamicModule;
  static withMapper(
    globalSettings?: AutoMapperGlobalSettings & { dev?: boolean }
  ): DynamicModule;
  static withMapper(...args: any[]): DynamicModule {
    const [name, globalSettings] = getWithMapperArgs(args);
    const mapper = new AutoMapper();
    if (globalSettings != null) {
      globalSettings.throwError =
        globalSettings.dev != null ? !globalSettings.dev : undefined;
      mapper.withGlobalSettings(globalSettings);
    }

    const providers = withMapperProviders(mapper, name);
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

  /**
   * Initialize an AutoMapper instance with a name. Default to "default"
   *
   * Generally, `forRoot` only needs to be ran once to provide a singleton for the whole application
   *
   * @param {AutomapperModuleRootOptions} options
   * @deprecated Please use withMapper instead
   */
  static forRoot(options?: AutomapperModuleRootOptions): DynamicModule {
    const mapper = new AutoMapper();

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
