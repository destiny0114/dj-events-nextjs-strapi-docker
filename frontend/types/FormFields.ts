import { Event } from "./Event";

export interface FormFields extends Omit<Event["attributes"], "image"> {
  image?: string | undefined;
}
