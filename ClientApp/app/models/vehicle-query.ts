export interface VehicleQuery {
  makeId?: number; 
  modelId?: number; 
  sortBy?: string; 
  isSortAscending?: boolean;
  page: number 
  pageSize: number 
}