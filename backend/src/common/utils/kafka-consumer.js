// workers/kafka-consumer.js
const { Kafka } = require('kafkajs');
const io = require('socket.io')(3001); // Your WS Server

const kafka = new Kafka({ clientId: 'ws-broadcaster', brokers: ['localhost:9092'] });
const consumer = kafka.consumer({ groupId: 'vendor-notification-group' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'service-requests', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const job = JSON.parse(message.value.toString());
      
      // Broadcast to the specific vendor room
      io.to(`room_${job.service_type}`).emit('new_job', job);
      
      console.log(`Broadcasted job ${job.id} to ${job.service_type} vendors`);
    },
  });
};

run().catch(console.error);