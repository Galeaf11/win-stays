import ServerService from './services/ServerService';
import { port } from './config';
import bootstrapService from './services/BootstrapService';
import DBService from './services/DBService';
import WakuService, { WakuMessageHandler } from './services/WakuService';
import { Test } from './proto/test';

process.on('unhandledRejection', async error => {
  console.log(error);
  await DBService.getInstance().close();
  process.exit(1);
});

const main = async (): Promise<ServerService> => {
  const server = new ServerService(port);

  await bootstrapService.bootstrap();

  const wakuService = await WakuService
    .connect()
  ;

  const handler: WakuMessageHandler = (message) => {
    return wakuService.processMessage(Test, message);
  };

  await wakuService.makeWakuObserver(handler, ['/my-cool-app/1/my-use-case/test-waku-123']);

  return server.start();
};

export default main()
  .catch(async error => {
    console.log(error);
    await DBService.getInstance().close();
    process.exit(1);
  });
