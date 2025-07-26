export interface Params {
  request: () => Promise<any>;
  onSuccess?: (data: any) => void | Promise<void>;
  onError?: (error: any) => void;
}
