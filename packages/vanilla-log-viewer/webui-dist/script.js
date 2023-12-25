import { getDevToolsPluginClientAsync } from 'expo/devtools';

(async function () {
  var logContainer = document.getElementById('root');

  function createLogItem(message, type) {
    if (typeof message == 'object') {
      message = JSON.stringify(message, null, 2);
    }
    var logItem = document.createElement('div');
    logItem.className = 'log-item ' + type;
    logItem.textContent = message;
    logContainer.appendChild(logItem);
  }

  const client = await getDevToolsPluginClientAsync('vanilla-log-viewer');
  client.addMessageListener('log', (message) => {
    createLogItem(message, 'log');
  });
  client.addMessageListener('warn', (message) => {
    createLogItem(message, 'warn');
  });
  client.addMessageListener('error', (message) => {
    createLogItem(message, 'error');
  });
})();
