import {join} from 'path';
import {config} from './wdio.shared.conf';
//
// ======
// Appium
// ======
//
config.services = (config.services ? config.services : []).concat([
    [
        'appium',
        {
            // This will use the globally installed version of Appium
            command: ['appium'],
            args: {
                // This is needed to tell Appium that we can execute local ADB commands
                // and to automatically download the latest version of ChromeDriver
                relaxedSecurity: true,
                address: '127.0.0.1',
                log: join(process.cwd(), './logs/appium.log'),
                logLevel: 'info:info',
                localTimezone: true,
                debugLogSpacing: true,
            },
            //logPath: './logs',
        },

    ],
]);
//
// =====================
// Server Configurations
// =====================
//
config.port = 4723;


export default config;
