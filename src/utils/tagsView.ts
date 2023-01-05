const whiteList = ['/login', '/import', '/404', '/401']
export const isTags = (path: string) => {
  return !whiteList.includes(path)
}
