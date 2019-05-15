import ServerIndex from './index';

// Start the server
if (process.argv[2] !== 'test') {
    let server = new ServerIndex();
    server.start();
} 

