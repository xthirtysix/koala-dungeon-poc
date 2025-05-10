// composables/useMarkdownParser.ts
// Import package exports
import { createMarkdownParser, rehypeHighlight } from '@nuxtjs/mdc/runtime'

export default function useMarkdownParser() {
    let parser: Awaited<ReturnType<typeof createMarkdownParser>>

    const parse = async (markdown: string) => {
        if (!parser) {
            parser = await createMarkdownParser({
                rehype: {
                    plugins: {
                        highlight: {
                            instance: rehypeHighlight,
                        },
                    },
                },
            })
        }
        return parser(markdown)
    }

    return parse
}
