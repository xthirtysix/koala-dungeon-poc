
export type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950

export type ColorName =
    | 'red'
    | 'yellow'
    | 'green'
    | 'blue'
    | 'violet'
    | 'slate'
    | 'orange'

export interface RgbColor {
    r: number
    g: number
    b: number
}

export interface PaletteColor {
    name: ColorName
    shade: ColorShade
    rgb: RgbColor
}

export const COLOR_NAMES = [
    'red',
    'yellow',
    'green',
    'blue',
    'violet',
    'slate',
    'orange',
]

/**
 * Full Tailwind color palette with RGB values
 */
export const COLOR_PALETTE: PaletteColor[] = [
    // Red - Warmer, more amber-toned
    { name: 'red', shade: 50, rgb: { r: 253, g: 245, b: 243 } },
    { name: 'red', shade: 100, rgb: { r: 250, g: 232, b: 227 } },
    { name: 'red', shade: 200, rgb: { r: 245, g: 209, b: 199 } },
    { name: 'red', shade: 300, rgb: { r: 234, g: 175, b: 160 } },
    { name: 'red', shade: 400, rgb: { r: 214, g: 133, b: 114 } },
    { name: 'red', shade: 500, rgb: { r: 189, g: 95, b: 73 } },
    { name: 'red', shade: 600, rgb: { r: 158, g: 65, b: 47 } },
    { name: 'red', shade: 700, rgb: { r: 131, g: 50, b: 35 } },
    { name: 'red', shade: 800, rgb: { r: 108, g: 39, b: 27 } },
    { name: 'red', shade: 900, rgb: { r: 88, g: 31, b: 21 } },
    { name: 'red', shade: 950, rgb: { r: 72, g: 24, b: 16 } },

    // Yellow/Gold - Richer, honey-toned
    { name: 'yellow', shade: 50, rgb: { r: 255, g: 252, b: 235 } },
    { name: 'yellow', shade: 100, rgb: { r: 254, g: 246, b: 208 } },
    { name: 'yellow', shade: 200, rgb: { r: 252, g: 234, b: 168 } },
    { name: 'yellow', shade: 300, rgb: { r: 247, g: 217, b: 122 } },
    { name: 'yellow', shade: 400, rgb: { r: 238, g: 195, b: 72 } },
    { name: 'yellow', shade: 500, rgb: { r: 218, g: 167, b: 37 } },
    { name: 'yellow', shade: 600, rgb: { r: 183, g: 137, b: 24 } },
    { name: 'yellow', shade: 700, rgb: { r: 149, g: 108, b: 16 } },
    { name: 'yellow', shade: 800, rgb: { r: 119, g: 84, b: 11 } },
    { name: 'yellow', shade: 900, rgb: { r: 98, g: 68, b: 9 } },
    { name: 'yellow', shade: 950, rgb: { r: 82, g: 55, b: 7 } },

    // Green - Warmer sage/olive tones
    { name: 'green', shade: 50, rgb: { r: 242, g: 250, b: 238 } },
    { name: 'green', shade: 100, rgb: { r: 226, g: 244, b: 216 } },
    { name: 'green', shade: 200, rgb: { r: 196, g: 229, b: 179 } },
    { name: 'green', shade: 300, rgb: { r: 158, g: 207, b: 137 } },
    { name: 'green', shade: 400, rgb: { r: 116, g: 175, b: 95 } },
    { name: 'green', shade: 500, rgb: { r: 83, g: 147, b: 64 } },
    { name: 'green', shade: 600, rgb: { r: 60, g: 120, b: 45 } },
    { name: 'green', shade: 700, rgb: { r: 46, g: 96, b: 35 } },
    { name: 'green', shade: 800, rgb: { r: 35, g: 77, b: 27 } },
    { name: 'green', shade: 900, rgb: { r: 27, g: 62, b: 21 } },
    { name: 'green', shade: 950, rgb: { r: 21, g: 50, b: 17 } },

    // Blue - Warmer slate blue
    { name: 'blue', shade: 50, rgb: { r: 241, g: 245, b: 250 } },
    { name: 'blue', shade: 100, rgb: { r: 227, g: 235, b: 246 } },
    { name: 'blue', shade: 200, rgb: { r: 203, g: 218, b: 237 } },
    { name: 'blue', shade: 300, rgb: { r: 169, g: 192, b: 222 } },
    { name: 'blue', shade: 400, rgb: { r: 127, g: 158, b: 199 } },
    { name: 'blue', shade: 500, rgb: { r: 95, g: 130, b: 174 } },
    { name: 'blue', shade: 600, rgb: { r: 72, g: 105, b: 148 } },
    { name: 'blue', shade: 700, rgb: { r: 55, g: 85, b: 123 } },
    { name: 'blue', shade: 800, rgb: { r: 42, g: 68, b: 101 } },
    { name: 'blue', shade: 900, rgb: { r: 33, g: 55, b: 82 } },
    { name: 'blue', shade: 950, rgb: { r: 26, g: 44, b: 68 } },

    // Violet - Warmer plum/mauve
    { name: 'violet', shade: 50, rgb: { r: 250, g: 242, b: 250 } },
    { name: 'violet', shade: 100, rgb: { r: 246, g: 226, b: 246 } },
    { name: 'violet', shade: 200, rgb: { r: 237, g: 199, b: 237 } },
    { name: 'violet', shade: 300, rgb: { r: 220, g: 163, b: 220 } },
    { name: 'violet', shade: 400, rgb: { r: 195, g: 121, b: 197 } },
    { name: 'violet', shade: 500, rgb: { r: 168, g: 85, b: 172 } },
    { name: 'violet', shade: 600, rgb: { r: 140, g: 58, b: 145 } },
    { name: 'violet', shade: 700, rgb: { r: 115, g: 43, b: 120 } },
    { name: 'violet', shade: 800, rgb: { r: 93, g: 32, b: 98 } },
    { name: 'violet', shade: 900, rgb: { r: 75, g: 24, b: 79 } },
    { name: 'violet', shade: 950, rgb: { r: 61, g: 18, b: 65 } },

    // Orange - Enhanced warmth
    { name: 'orange', shade: 50, rgb: { r: 255, g: 248, b: 235 } },
    { name: 'orange', shade: 100, rgb: { r: 254, g: 237, b: 203 } },
    { name: 'orange', shade: 200, rgb: { r: 251, g: 215, b: 152 } },
    { name: 'orange', shade: 300, rgb: { r: 242, g: 186, b: 101 } },
    { name: 'orange', shade: 400, rgb: { r: 227, g: 156, b: 56 } },
    { name: 'orange', shade: 500, rgb: { r: 203, g: 130, b: 23 } },
    { name: 'orange', shade: 600, rgb: { r: 173, g: 107, b: 13 } },
    { name: 'orange', shade: 700, rgb: { r: 143, g: 86, b: 8 } },
    { name: 'orange', shade: 800, rgb: { r: 116, g: 68, b: 6 } },
    { name: 'orange', shade: 900, rgb: { r: 93, g: 53, b: 4 } },
    { name: 'orange', shade: 950, rgb: { r: 74, g: 42, b: 3 } },
]

/**
 * Get RGB color by name and shade
 */
export function getColorRgb(name: ColorName, shade: ColorShade): RgbColor | undefined {
    return COLOR_PALETTE.find(c => c.name === name && c.shade === shade)?.rgb
}

/**
 * Convert RGB to CSS rgb() string
 */
export function rgbToString(rgb: RgbColor): string {
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
}

/**
 * Convert RGB to hex string
 */
export function rgbToHex(rgb: RgbColor): string {
    const toHex = (n: number) => n.toString(16).padStart(2, '0')
    return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`
}

/**
 * Get color as CSS rgb() string
 */
export function getColorString(name: ColorName, shade: ColorShade): string | undefined {
    const rgb = getColorRgb(name, shade)
    return rgb ? rgbToString(rgb) : undefined
}

/**
 * Get color as hex string
 */
export function getColorHex(name: ColorName, shade: ColorShade): string | undefined {
    const rgb = getColorRgb(name, shade)
    return rgb ? rgbToHex(rgb) : undefined
}

const SHADES: ColorShade[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

/**
 * Creates a color generator that returns unique colors without repetition.
 * When all colors in current shade are used, moves to +100, -100, +200, -200, etc.
 */
export function createColorGenerator(baseShade: ColorShade = 500) {
    const used = new Set<string>()
    let shadeOffset = 0

    const getNextShade = (): ColorShade | null => {
        const baseIndex = SHADES.indexOf(baseShade)

        while (true) {
            const delta = Math.ceil(shadeOffset / 2) * (shadeOffset % 2 === 0 ? 1 : -1)
            const targetIndex = baseIndex + delta

            if (targetIndex < 0 || targetIndex >= SHADES.length) {
                shadeOffset++
                if (shadeOffset > SHADES.length * 2) return null
                continue
            }

            return SHADES[targetIndex]
        }
    }

    return () => {
        let currentShade = getNextShade()

        while (currentShade !== null) {
            const availableColors = COLOR_NAMES.filter(
                name => !used.has(`${name}-${currentShade}`),
            ) as ColorName[]

            if (availableColors.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableColors.length)
                const name = availableColors[randomIndex]
                used.add(`${name}-${currentShade}`)

                const rgb = getColorRgb(name, currentShade)
                return rgb ? rgbToString(rgb) : 'rgb(128, 128, 128)'
            }

            shadeOffset++
            currentShade = getNextShade()
        }

        // All colors exhausted, reset and start over
        used.clear()
        shadeOffset = 0
        return createColorGenerator(baseShade)()
    }
}

