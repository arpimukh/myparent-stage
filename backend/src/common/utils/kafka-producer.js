// lib/kafka-producer.js
import { Kafka } from 'kafkajs';

const kafka = new Kafka({ clientId: 'service-app', brokers: ['localhost:9092'] });
const producer = kafka.producer();

export async function sendServiceRequest(payload) {
  await producer.connect();
  await producer.send({
    topic: 'service-requests',
    messages: [
      { 
        key: payload.service_type, // Ensures order within the service type
        value: JSON.stringify(payload) 
      },
    ],
  });
}