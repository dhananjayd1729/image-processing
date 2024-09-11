import axios from "axios";

const sendWebhook = async (requestId, status, outputData) => {
  try {
    const webhookUrl = process.env.WEBHOOK_URL;
    await axios.post(webhookUrl, {
      requestId,
      status,
      outputData,
    });
    console.log('Webhook sent successfully');
  } catch (error) {
    console.error('Error sending webhook:', error);
  }
};

export { sendWebhook };