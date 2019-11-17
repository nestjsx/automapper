import { MappingProfile } from '@nartc/automapper';

export const PROFILE_MAP = 'nestjs__PROFILE_MAP';
export const ProfileMap: Map<
  string,
  new (...args: any) => MappingProfile
> = new Map<string, { new (...args: any): MappingProfile }>();
