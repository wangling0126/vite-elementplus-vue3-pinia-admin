export namespace Auth {
  export interface ResRoles {
    id: string
    rolesName: string
    status: string
    create_time: string
    description: string
  }
  export interface ResMenu {
    id: number
    name: string
    descripition: string
    parent_id: number
    status: number
    create_time: string
    update_time: string
    order_id: number
    path: string
    children: ResMenu[]
  }
}
