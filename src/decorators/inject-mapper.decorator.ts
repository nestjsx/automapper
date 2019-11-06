import { Inject } from '@nestjs/common';
import { getMapperToken } from '../utils/getMapperToken';

/**
 * Inject the AutoMapper intsance with name.
 *
 * @param {string} name - Name of the AutoMapper instance
 * @default default
 */
export const InjectMapper = (name?: string) => Inject(getMapperToken(name));
