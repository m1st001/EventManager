import { injectable } from "inversify";

export interface IDialogService {
  confirmationDialog(message: string): Promise<boolean>;
}

@injectable()
export class DialogService implements IDialogService {
  confirmationDialog(message: string): Promise<boolean> {
    return Promise.resolve(false);
  }
}
