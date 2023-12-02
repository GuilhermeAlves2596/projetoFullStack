const amqp = require('amqplib');
const cron = require('node-cron');
const sequelize = require('../helpers/bd');
const logDAO = require('../model/logModel');
var cartaDAO = require('../model/cartaModel')

const rabbitmqConfig = {
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672,
    username: 'guest',
    password: 'guest',
    vhost: '/',
};

async function sendMessageToQueue(message) {
    try {
        const connection = await amqp.connect(rabbitmqConfig);
        const channel = await connection.createChannel();

        const queue = 'logs';  // Nome da fila

        // Declara a fila no RabbitMQ
        await channel.assertQueue(queue, { durable: false });

        // Envia a mensagem para a fila
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        console.log(`[RabbitMQ] Mensagem enviada para a fila: ${JSON.stringify(message)}`);

        // Fecha a conexão
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('[RabbitMQ] Erro ao enviar mensagem para a fila:', error);
    }
}

async function consumeMessages() {
    try {
        const connection = await amqp.connect(rabbitmqConfig);
        const channel = await connection.createChannel();

        const queue = 'logs';  // Nome da fila

        // Declara a fila no RabbitMQ
        await channel.assertQueue(queue, { durable: false });

        console.log(`[RabbitMQ Consumer] Aguardando mensagens da fila: ${queue}`);

        // Define a função de callback para processar as mensagens
        channel.consume(queue, async (msg) => {
            const messageContent = msg.content.toString();
            console.log(`[RabbitMQ Consumer] Mensagem recebida: ${messageContent}`);

            // Processa a mensagem (armazena no banco de dados neste exemplo)
            await processMessage(messageContent);

            // Confirma o recebimento da mensagem para removê-la da fila
            channel.ack(msg);
        });
    } catch (error) {
        console.error('[RabbitMQ Consumer] Erro ao conectar e consumir mensagens:', error);
    }
}

async function processMessage(message) {
    try {
        // Lógica para processar a mensagem (armazenar no banco de dados neste exemplo)
        // await sequelize.sync({ force: false });
        await logDAO.save(message);

        console.log('[RabbitMQ Consumer] Mensagem processada e armazenada no banco de dados.');
    } catch (error) {
        console.error('[RabbitMQ Consumer] Erro ao processar a mensagem:', error);
    }
}

// Agendamento para executar o consumidor a cada 1 minutos
cron.schedule('*/1 * * * *', async () => {
    console.log('[Scheduled Task] Executando consumidor RabbitMQ...');
    await consumeMessages();
});

module.exports = {
    async validData(req, res, next) {
        const { image, name, status, species, gender } = req.body;

        if (!image || !name || !status || !species || !gender) {
            let msg = 'Erro ao cadastrar a carta: ' + name;
            await sendMessageToQueue({ msg });
            res.status(403).json({ status: false, msg: "Todos os campos devem ser preenchidos." });
            return;
        }
        next();
    },

    async validLogin(msg) {
        await sendMessageToQueue({ msg });
    },

    async errorCard(msg) {
        await sendMessageToQueue({ msg });
    }
}
