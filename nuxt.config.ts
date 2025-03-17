import fs from 'fs'
import path from 'path'

function getPngFilesFromDirectory(directoryPath) {
    try {
        // Проверяем существование директории
        if (!fs.existsSync(directoryPath)) {
            console.warn(`Директория ${directoryPath} не существует`)
            return []
        }

        // Получаем список всех файлов
        const files = fs.readdirSync(directoryPath)

        // Фильтруем только PNG файлы
        return files.filter(
            (file) => path.extname(file).toLowerCase() === '.png',
        )
    } catch (error) {
        console.error(`Ошибка при чтении директории ${directoryPath}:`, error)
        return []
    }
}

function generateImageRoutes(imageFiles, directory = 'artefacts'): string[] {
    const routes: string[] = []

    // Для каждого файла создаем маршруты с разными размерами
    imageFiles.forEach((file) => {
        routes.push(`/_ipx/q_80&s_300x300/${directory}/${file}`)
    })

    return routes
}

const artefactsDir = path.resolve('./public/artefacts')
const pngFiles = getPngFilesFromDirectory(artefactsDir)
const imageRoutes = generateImageRoutes(pngFiles)

export default defineNuxtConfig({
    // ssr: false,
    compatibilityDate: '2025-03-12',
    future: {
        compatibilityVersion: 4,
    },
    devtools: { enabled: true },
    srcDir: 'src',
    app: {
        baseURL: '/',
    },
    dir: {
        app: 'app',
        pages: 'app/routes',
        layouts: 'app/layouts',
    },
    modules: ['@nuxt/ui', '@nuxt/image'],
    css: ['~/app/assets/css/main.css'],
    alias: {
        public: '../public',
    },
    image: {
        domains: ['xthirtysix.ru'],
        quality: 80,
        format: ['avif', 'webp', 'png'],
        presets: {
            artefact: {
                modifiers: {
                    width: 300,
                    height: 300,
                },
            },
        },
    },
    nitro: {
        prerender: {
            routes: imageRoutes,
        },
    },
})
