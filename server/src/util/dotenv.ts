export function load(path: string): string {
  const variable = process.env[path];

  if (!variable) {
    throw Error('${path} environmental variable not defined');
  }

  return variable;
}
