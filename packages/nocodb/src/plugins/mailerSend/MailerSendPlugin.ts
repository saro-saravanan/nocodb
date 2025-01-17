import {IEmailAdapter, XcEmailPlugin} from "nc-plugin";

import MailerSend from "./MailerSend";


class MailerSendPlugin extends XcEmailPlugin {

  private static storageAdapter: MailerSend;

  public  getAdapter(): IEmailAdapter {
    return MailerSendPlugin.storageAdapter;
  }

  public async init(config: any): Promise<any> {
    MailerSendPlugin.storageAdapter = new MailerSend(config);
    await MailerSendPlugin.storageAdapter.init();
  }

}

export default MailerSendPlugin;
