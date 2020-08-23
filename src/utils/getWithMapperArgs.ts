import { AutoMapperGlobalSettings } from '@nartc/automapper';

export function getWithMapperArgs(
  args: any[]
): [string, (AutoMapperGlobalSettings & { dev?: boolean })?] {
  if (!args.length) {
    return [''];
  }

  if (args.length === 2) {
    return [args[0], args[1]];
  }

  if (args.length === 1) {
    const arg = args[0];
    if (typeof arg === 'string') {
      return [arg];
    }

    return ['', arg];
  }

  return [''];
}
