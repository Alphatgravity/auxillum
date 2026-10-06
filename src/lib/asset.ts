// Préfixe les fichiers de /public avec le basePath (ex. /auxillum sur GitHub
// Pages). next/link l'ajoute tout seul, mais pas next/image ni <video>.
export const asset = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
