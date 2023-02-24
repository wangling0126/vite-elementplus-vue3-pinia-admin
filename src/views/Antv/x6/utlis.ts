/**
 * @description: 注册公共节点
 * @return {*}
 */
export const getProtsGroup = () => {
  return {
    groups: {
      in: {
        position: 'left',
        label: {
          position: 'left'
        },
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#31d0c6',
            strokeWidth: 2,
            fill: '#fff'
          }
        }
      },
      out: {
        position: 'right',
        label: {
          position: 'right'
        },
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#31d0c6',
            strokeWidth: 2,
            fill: '#fff'
          }
        }
      }
    }
  }
}
