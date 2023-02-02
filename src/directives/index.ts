// import print from 'vue3-print-nb'
import print from './print/index'

export default (app: { use: (arg0: any) => void }) => {
  app.use(print)
}
