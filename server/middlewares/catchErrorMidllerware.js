const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    ctx.error(e.message, null)
  }
}

export default catchError
