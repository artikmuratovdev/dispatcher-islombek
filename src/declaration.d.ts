declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "virtual:pwa-register" {
  export interface RegisterSWOptions {
    immediate?: boolean;
  }

  export function registerSW(options?: RegisterSWOptions): void;
}
