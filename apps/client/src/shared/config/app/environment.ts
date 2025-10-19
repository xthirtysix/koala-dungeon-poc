import { CURRENT_MARATHON_UID } from '../consts/marathon.consts'

const config = {
    development: {
        apiUrl: 'http://localhost:1337/api',
        mainCharacterId: 'wm61806j2w7384dumhnap2ze',
        marathonVersion: CURRENT_MARATHON_UID,
    },
    production: {
        apiUrl: 'https://api.xthirtysix.ru/api',
        mainCharacterId: 'wm61806j2w7384dumhnap2ze',
        marathonVersion: CURRENT_MARATHON_UID,
    },
}

export default config[import.meta.env.VITE_APP_MODE as keyof typeof config] || config.production
