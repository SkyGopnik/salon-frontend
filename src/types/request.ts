import { Service } from "src/types/service";

export interface RequestI {
  id: number,
  firstName: string,
  lastName: string,
  phone: string,
  time: string,
  serviceId: number,
  saloonId: number,
  service?: Service,
  createdAt: string
}
