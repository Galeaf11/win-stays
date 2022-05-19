import { Waku, WakuMessage } from 'js-waku';


const main = async () => {
  console.log("Connecting to Waku...");
  const waku = await Waku.create({ bootstrap: { default: true } });
  await waku.waitForRemotePeer();
  console.log("...Connected");

  const msg = await WakuMessage.fromUtf8String(
    "Some message 15",
    "/my-cool-app/1/my-use-case/proto112233"
  );
  await waku.relay.send(msg);
  console.log('sended');
};

export default main()
  .catch(async error => {
    console.log(error);
    process.exit(1);
  });
