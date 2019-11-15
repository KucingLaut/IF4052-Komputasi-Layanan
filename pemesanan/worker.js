const { Client, Variables, logger } = require('camunda-external-task-client-js');
const request = require('request-promise');
const db = require('./db_connect');

const config = {
    baseUrl: 'http://localhost:8080/engine-rest',
    use: logger,
    asyncResponseTimeout: 10000
};
const messageAPI = `${config.baseUrl}/message`;

const client = new Client(config);

client.subscribe('cari-daftar-penyedia', async function({ task, taskService }) {
    console.log(`Mencari daftar penyedia...`);
    var variables = new Variables();
    variables.set('provider', 'steam')
    await taskService.complete(task, variables);
});

client.subscribe('kirim-daftar-penyedia', async function({task, taskService}) {
    console.log(`Mengirim daftar penyedia...`);
    var msgVariables = new Variables();
    msgVariables.set('provider', task.variables.get('provider'));
    msgVariables.set('amount', 0);
    var data = {
        'messageName': 'daftarPenyedia',
        'businessKey': task.businessKey,
        'processVariables': msgVariables.getAllTyped()
    };
    await request.post(messageAPI, {
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(data)
    });
    logger.success('Finished sending message!');
    await taskService.complete(task);
});

client.subscribe('kirim-pesanan', async function({task, taskService}) {
    console.log(`Mengirim pesanan...`);
    var orderVariables = new Variables();
    orderVariables.set('amount', task.variables.get('amount'))
    var data = {
        'messageName': 'pesanan',
        'businessKey': task.businessKey,
        'processVariables': orderVariables.getAllTyped()
    };
    try {
        await request.post(messageAPI, {
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(data)
        });
        console.log('Finished sending pesanan!');
    } catch (err) {
        console.log(err);
    }
    await taskService.complete(task);
});

client.subscribe('proses-pesanan', async function({task, taskService}) {
    console.log(`Memproses pesanan...`);
    var provider = task.variables.get('provider');
    var amount = task.variables.get('amount');
    // Isi ke database
    var pool = db.getPool();
    pool.query('INSERT INTO pemesanan (provider, amount) VALUES ($1, $2)', [provider, amount], function(err, rows){
        if (err) {
            console.log(err);
        }
    });
    await taskService.complete(task);
});

client.subscribe('kirim-invoice', async function({task, taskService}){
    var provider = task.variables.get('provider');
    var amount = task.variables.get('amount');
    var invoiceVariables = new Variables();
    invoiceVariables.set('provider', provider);
    invoiceVariables.set('amount', amount);
    console.log(`Mengirim invoice...`);
    var data = {
        'messageName': 'invoice',
        'businessKey': task.businessKey,
        'processVariables': invoiceVariables.getAllTyped()
    };
    await request.post(messageAPI, {
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(data)
    });
    console.log('Finished sending invoice!');
    // Complete the task
    await taskService.complete(task);
});

client.subscribe('baca-invoice', async function({task, taskService}) {
    var provider = task.variables.get('provider');
    var amount = task.variables.get('amount');
    console.log(`Provider: ${provider}\nAmount: ${amount}`);
    taskService.complete(task);
});