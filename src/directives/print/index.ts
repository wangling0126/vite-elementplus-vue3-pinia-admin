/*eslint-disable*/

import Print from './packages/print'
Print.install = function (Vue) {
  Vue.directive('print', Print)
}

export default Print
