/**
 * @deprecated Will be removed soon
 */
export interface AutomapperModuleRootOptions {
  /**
   * Configuration Function to be ran when initialize a new AutoMapper instance
   *
   * @param {AutoMapperConfiguration} cfg
   */
  config?: (cfg: any) => void;

  /**
   * Name of the AutoMapper instance
   *
   * @default default
   */
  name?: string;
}
