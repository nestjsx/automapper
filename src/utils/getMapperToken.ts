const AUTOMAPPER = 'nestjs__AUTO_MAPPER__';
export const getMapperToken = (name?: string) =>
  name ? AUTOMAPPER + name : AUTOMAPPER + 'default';
