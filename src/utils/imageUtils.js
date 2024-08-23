export function getImage(name) {
  const pathParent = '../assets/img/'
  return new URL(pathParent + name, import.meta.url).href
}
