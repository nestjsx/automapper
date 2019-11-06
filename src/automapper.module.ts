import { AutoMapper } from '@nartc/automapper';
import { DynamicModule, Global, Logger, Module } from '@nestjs/common';
import { forFeatureProviders, forRootProviders } from './automapper.provider';
import {
  AutomapperModuleFeatureOptions,
  AutomapperModuleRootOptions,
} from './interfaces';

@Global()
@Module({})
export class AutomapperModule {
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
      providers,
      exports: providers,
    };
  }

  /**
   * Add to the AutoMapper instance a list of MappingProfiles. By default, the instance with name "default" will be
   * used.
   *
   * @param {AutomapperModuleFeatureOptions} options
   */
  static forFeature(options: AutomapperModuleFeatureOptions): DynamicModule {
    if (!options || (options && !options.profiles.length)) {
      const message = 'AutomapperModuleFeatureOptions.profiles is empty';
      this.logger.error(message);
      throw new Error(message);
    }
    const providers = forFeatureProviders(options);
    return {
      module: AutomapperModule,
      imports: [AutomapperModule],
      providers,
      exports: providers,
    };
  }
}
