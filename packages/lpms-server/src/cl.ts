import WakuService from './services/WakuService';
import { Test } from "./proto/test";

const main = async () => {
  const wakuService = await WakuService
    .connect();

  const testPayload: Test = {
    test1: 'asdf',
    test2: '12353234234asdfasf' + Math.random() * 1000
  };

  await wakuService.sendMessage(Test, testPayload, '/my-cool-app/1/my-use-case/test-waku-123');
  await wakuService.sendMessage(Test, testPayload, '/my-cool-app/1/my-use-case/test-waku-123');
  await wakuService.sendMessage(Test, testPayload, '/my-cool-app/1/my-use-case/test-waku-123');
  const a = await wakuService.sendMessage(Test, testPayload, '/my-cool-app/1/my-use-case/test-waku-123');
  console.log('sent', a);
};

export default main()
  .catch(async error => {
    console.log(error);
    process.exit(1);
  });
