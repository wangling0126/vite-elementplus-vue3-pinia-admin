export namespace Auth {
  export interface ResRoles {
    id: string
    rolesName: string
    status: string
    create_time: string
    description: string
    name: string
  }
  export interface ResMenu {
    id: number
    routerName: string
    label: string
    parent_id: number
    status: number
    create_time: string
    update_time: string
    order_id: number
    path: string
    children: ResMenu[]
  }
}
