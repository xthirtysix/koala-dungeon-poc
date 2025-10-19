import { buildQuery } from '@/shared/api/build-query'
import { API_URL } from '@/shared/config'
import { BELT_SLOTS, MAIN_CHARACTER_ID } from '@/entities/character'
import { ArtefactSlot } from '@/entities/artefact'

interface FetchCharacterResult {
    data: unknown
    meta: unknown
}

interface UpdateMapPlacementResponse {
    data: unknown
    meta: unknown
}

export const characterApi = {
    fetchMain: async (): Promise<FetchCharacterResult> => {
        const artefactsParams = Object.keys(ArtefactSlot).reduce(
            (acc, slot) => {
                if (slot === 'Belt') {
                    for (let i = 1; i <= BELT_SLOTS; i++) {
                        acc[`populate[${slot.toLowerCase()}${i}][populate]`] =
                            '*'
                    }
                    return acc
                } else {
                    acc[`populate[${slot.toLowerCase()}][populate]`] = '*'
                    return acc
                }
            },
            {} as Record<string, string>,
        )
        const query = buildQuery(artefactsParams)
        const url = query
            ? `${API_URL}/characters/${MAIN_CHARACTER_ID}?${query}`
            : `${API_URL}/characters/${MAIN_CHARACTER_ID}`

        try {
            const res = await fetch(url)

            if (!res.ok) throw new Error('Ошибка загрузки персонажа')

            const response = await res.json()

            return {
                data: response.data ?? response,
                meta: response.meta ?? null,
            }
        } catch (error) {
            console.error('Ошибка при загрузке персонажа:', error)
            throw error
        }
    },

    updateMapPlacement: async (
        mapPlacement: number
    ): Promise<UpdateMapPlacementResponse> => {
        const jwt = localStorage.getItem('jwt')
        if (!jwt) {
            throw new Error('JWT токен не найден')
        }

        try {
            const res = await fetch(`${API_URL}/characters/${MAIN_CHARACTER_ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify({
                    data: {
                        map_placement: mapPlacement,
                    }
                }),
            })

            if (!res.ok) {
                const error = await res.json()
                throw new Error(error?.error?.message || 'Ошибка обновления позиции персонажа')
            }

            const response = await res.json()
            console.log(response)

            return {
                data: response.data ?? response,
                meta: response.meta ?? null,
            }
        } catch (error) {
            console.error('Ошибка при обновлении позиции персонажа:', error)
            throw error
        }
    },
}
