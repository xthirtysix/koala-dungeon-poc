import { MAIN_CHARACTER_ID, Character, UpdateMapPlacementParams } from '@/entities/character'
import { publicApi, privateApi } from '@/shared/api'
import type { StrapiResponse } from '@/shared/model/strapi.type'
import qs from 'qs'

export const characterApi = {
    getMain: async () => {
        return publicApi.get<StrapiResponse<Character>>(
            `characters/${MAIN_CHARACTER_ID}`,
            {
                searchParams: qs.stringify({
                    populate: {
                        head: {
                            populate: '*',
                        },
                        chest: {
                            populate: '*',
                        },
                        hands: {
                            populate: '*',
                        },
                        feet: {
                            populate: '*',
                        },
                        weapon: {
                            populate: '*',
                        },
                        belt1: {
                            populate: '*',
                        },
                        belt2: {
                            populate: '*',
                        },
                        belt3: {
                            populate: '*',
                        },
                    }
                })
            },
        )
    },

    unlockMovement: async () => {
        return privateApi.put(`characters/${MAIN_CHARACTER_ID}`, {
            json: {
                data: {
                    is_movement_locked: false,
                },
            },
        })
    },

    updateMapPlacement: async ({
        mapPlacement,
        isMovementLocked = false,
    }: UpdateMapPlacementParams) => {
        return privateApi.put<StrapiResponse<Character>>(`characters/${MAIN_CHARACTER_ID}`, {
            json: {
                data: {
                    map_placement: mapPlacement,
                    is_movement_locked: isMovementLocked,
                },
            },
        })
    },
}
