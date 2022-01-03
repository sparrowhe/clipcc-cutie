const logger = require('../util/logger.js');
const LocalStorage = require('node-localstorage').LocalStorage;
const storage = new LocalStorage('./luck');
const dayjs = require('dayjs');

class Sign {
    constructor (client) {
        this.client = client;
    }

    activate () {
        logger.info('签到组件加载成功！');
    }
    
    onGroupMessage (session) {
        if (session.raw_message === '签到') {
            const jrrp = parseInt(session.user_id / this.getSeed()) % 101;
            session.reply('签到成功(≧▽≦)！你今天的人品是：'+ jrrp);
        }
    }

    getSeed () {
        const now = dayjs().format('DD/MM/YYYY');
        if (now !== storage.getItem('date')) {
            storage.setItem('seed', Math.round(Math.random() * 100));
            storage.setItem('date', now);
        }
        return parseInt(storage.getItem('seed'));
    }
}

module.exports = Sign;