const { PubSub } = require('@google-cloud/pubsub');
const pubsub = new PubSub();

export async function publishMessage(videoId, params) {
  const topicName = 'video-processing';
  const data = {
    videoId: videoId,
    parameters: params
  };
  const dataBuffer = Buffer.from(JSON.stringify(data));
  await pubsub.topic(topicName).publish(dataBuffer);
}
