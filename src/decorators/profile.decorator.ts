import { SetMetadata } from '@nestjs/common/decorators';
import { getMapperToken } from '../utils/getMapperToken';
import { ProfileMap } from '../utils/profileMap';

export const Profile: (name?: string) => ClassDecorator = (name?: string) => (
  target: any
) => {
  !ProfileMap.has(target) && ProfileMap.set(target, target);
  SetMetadata('AUTO_MAPPER_PROFILE', getMapperToken(name))(target);
};
