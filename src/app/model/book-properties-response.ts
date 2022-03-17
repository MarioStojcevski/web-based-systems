import {PropertyHelperDto} from "./dto/property-helper.dto";

export interface BookPropertiesResponse {
  results: {
    bindings: PropertyHelperDto[];
  }
}
