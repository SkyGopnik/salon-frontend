import { RequestI } from "src/types/request";
import { Review } from "src/types/review";
import { Service } from "src/types/service";

export interface Saloon {
  id: number,
  name: string,
  description: string,
  reviews?: Array<Review>,
  requests?: Array<RequestI>,
  services?: Array<Service>
}
