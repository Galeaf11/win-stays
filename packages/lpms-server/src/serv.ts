import { Waku, WakuMessage } from 'js-waku';


const main = async () => {
  console.log("Connecting to Waku...");
  const waku = await Waku.create({ bootstrap: { default: true } });
  await waku.waitForRemotePeer();
  console.log("...Connected");

  waku.relay.addObserver(
    (msg: WakuMessage) => {
      if (!msg.payload) {
        console.log('bad');
        return;
      }
      console.log("Message received:", msg.payloadAsUtf8);
    },
    ["/my-cool-app/1/my-use-case/proto112233"]
  );
};

export default main()
  .catch(async error => {
    console.log(error);
    process.exit(1);
  });
