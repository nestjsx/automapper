import { AutoMapperConfiguration, MappingProfile } from '@nartc/automapper';

export interface AutomapperModuleRootOptions {
  /**
   * Configuration Function to be ran when initialize a new AutoMapper instance
   *
   * @param {AutoMapperConfiguration} cfg
   */
  config?: (cfg: AutoMapperConfiguration) => void;

  /**
   * Name of the AutoMapper instance
   *
   * @default default
   */
  name?: string;
}

export interface AutomapperModuleFeatureOptions {
  /**
   * An array of MappingProfile to be added to the AutoMapper instance
   */
  profiles: Array<MappingProfile>;

  /**
   * Name of the AutoMapper instance
   *
   * @default default
   */
  name?: string;
}
