export interface IUsecase {
  execute(...args: any): Promise<any>;
}
