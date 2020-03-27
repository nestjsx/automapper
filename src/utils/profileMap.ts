import { Constructible, MappingProfile } from '@nartc/automapper';

export const PROFILE_MAP = 'nestjs__PROFILE_MAP';
export const ProfileMap: Map<
  Constructible<MappingProfile>,
  Constructible<MappingProfile>
> = new Map<Constructible<MappingProfile>, Constructible<MappingProfile>>();
