const ftpClient = require('ftp-client');

const config = {
    host: 'ftp.datasus.gov.br',
    port: 21,
    user: 'anonymous',
    password: 'anonymous@'
}
const options = {
    logging: 'basic'
}
const client = new ftpClient(config, options);


client.connect(function () {

    client.download('/DISSEMIN/publicos/SIHSUS/2013/XML', 'xml/', {
        overwrite: 'all'
    }, function (result) {
        console.log(result);
    });

});