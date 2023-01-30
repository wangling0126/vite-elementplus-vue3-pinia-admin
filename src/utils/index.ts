export const isExcel = (file: File) => {
  return /\.(xlsx|xls|csv)$/.test(file.name)
}
