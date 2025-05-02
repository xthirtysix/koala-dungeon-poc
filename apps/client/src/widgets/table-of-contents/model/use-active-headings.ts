import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import type { Ref } from 'vue'
import type { TocLink } from '@nuxtjs/mdc'
import type { IndicatorPosition } from './types'

export function useActiveHeadings(
    links: TocLink[],
    tocContainerRef: Ref<HTMLElement | null> = ref(null)
) {
    const activeHeadingIds = ref<Set<string>>(new Set())
    const indicator = ref<IndicatorPosition | null>(null);
    const activeElementsClass = 'active';

    const getAllHeadingIds = (links: TocLink[]): string[] => {
        const ids: string[] = []

        for (const link of links) {
            ids.push(link.id)
            if (link.children && link.children.length > 0) {
                ids.push(...getAllHeadingIds(link.children))
            }
        }

        return ids
    }

    const isElementContentInViewport = (element: HTMLElement, headerHeightPx: number): boolean => {
        const rect = element.getBoundingClientRect()

        if (rect.top >= headerHeightPx && rect.top < window.innerHeight) {
            return true
        }

        let currentElement = element.nextElementSibling
        const contentElements: Element[] = []

        while (currentElement &&
               !['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(currentElement.tagName)) {
            contentElements.push(currentElement)
            currentElement = currentElement.nextElementSibling
        }

        for (const contentElement of contentElements) {
            const contentRect = contentElement.getBoundingClientRect()
            if (contentRect.top >= headerHeightPx &&
                contentRect.top < window.innerHeight) {
                return true
            }
        }

        return false
    }

    const updateIndicatorPosition = async (): Promise<void> => {
        await nextTick()

        const tocContainer = tocContainerRef.value;
        if (!tocContainer) return;

        const activeContainers = tocContainer.querySelectorAll(`.${activeElementsClass}`);
        if (activeContainers.length === 0) {
            indicator.value = null;
            return;
        }

        const containerRect = tocContainer.getBoundingClientRect();
        let minTop = Infinity;
        let maxBottom = 0;

        activeContainers.forEach(container => {
            const activeRect = container.getBoundingClientRect();
            const top = activeRect.top - containerRect.top;
            const bottom = top + activeRect.height;

            minTop = Math.min(minTop, top);
            maxBottom = Math.max(maxBottom, bottom);
        });

        indicator.value = {
            top: minTop,
            height: maxBottom - minTop
        };
    }

    const updateActiveHeadings = async (): Promise<void> => {
        const allHeadingIds = getAllHeadingIds(links)
        const newActiveIds = new Set<string>()

        const headerHeight = getComputedStyle(document.documentElement)
            .getPropertyValue('--header-height')
            .trim() || '4rem'

        const headerHeightPx = headerHeight.endsWith('rem')
            ? parseFloat(headerHeight) * 16
            : parseFloat(headerHeight)

        allHeadingIds.forEach(id => {
            const element = document.getElementById(id)
            if (element && isElementContentInViewport(element, headerHeightPx)) {
                newActiveIds.add(id)
            }
        })

        activeHeadingIds.value = newActiveIds
        await updateIndicatorPosition();
    }

    watch(activeHeadingIds, async () => {
        await updateIndicatorPosition();
    }, { deep: true });

    const handleScroll = (): void => {
        requestAnimationFrame(async () => {
            await updateActiveHeadings();
        });
    }

    let resizeTimeout: number | null = null
    const handleResize = (): void => {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }

        resizeTimeout = window.setTimeout(async () => {
            await updateActiveHeadings();
        }, 100) as unknown as number;
    }

    onMounted(async () => {
        await nextTick();
        await updateActiveHeadings();

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
    })

    onBeforeUnmount(() => {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
    })

    const scrollToHeading = (id: string, isFirstElement: boolean = false): void => {
        if (isFirstElement) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        } else {
            const element = document.getElementById(id)
            if (element) {
                const headerHeight = getComputedStyle(document.documentElement)
                    .getPropertyValue('--header-height')
                    .trim() || '4rem'

                const headerHeightPx = headerHeight.endsWith('rem')
                    ? parseFloat(headerHeight) * 16
                    : parseFloat(headerHeight)

                const elementPosition = element.getBoundingClientRect().top + window.scrollY

                window.scrollTo({
                    top: elementPosition - headerHeightPx - 16,
                    behavior: 'smooth'
                })
            }
        }
    }

    const isActive = (id: string): boolean => {
        return activeHeadingIds.value.has(id)
    }

    return {
        indicator,
        isActive,
        scrollToHeading,
        activeElementsClass,
    }
}
