type Disposable = {
  disposable: boolean;
};

declare module "mailify" {
  export function disposed(email: string): Promise<Disposable>;
}