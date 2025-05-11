 import type {
     MetaResponsePaginationByOffset,
     MetaResponsePaginationByPage,
 } from '@nuxtjs/strapi'
 import {type  Obstacle, obstacles as mockObstacles } from '@/entities/obstacle'
 import { buildQuery } from '@/shared/api'

 interface FetchObstaclesParams {
     page: number
     pageSize: number
 }

 interface FetchObstaclesResult {
     obstacles: Obstacle[]
     pagination: MetaResponsePaginationByPage | MetaResponsePaginationByOffset
 }

 export default {
     fetchObstacles: async ({
         page,
         pageSize,
     }: FetchObstaclesParams): Promise<FetchObstaclesResult> => {
         const query = buildQuery({
             'fields[0]': 'id',
             'fields[1]': 'name',
             'fields[2]': 'description',
             'fields[3]': 'type',
             'fields[4]': 'isUnlocked',
             'fields[5]': 'isActive',
             'sort[0]': 'isActive:desc',
             'sort[1]': 'isUnlocked:desc',
             'sort[2]': 'name:asc',
             'pagination[page]': page,
             'pagination[pageSize]': pageSize,
         })
         try {
             const res = await fetch(
                 `https://api.xthirtysix.ru/api/obstacles?${query}`,
             )
             if (!res.ok) throw new Error('Ошибка загрузки помех')
             const response = await res.json()
             return {
                 obstacles: response.data,
                 pagination: response.meta.pagination,
             }
         } catch (error) {
             // Логируем ошибку
             console.error('Ошибка при загрузке помех:', error)
             // Возвращаем все моки одной страницей
             const total = mockObstacles.length
             return {
                 obstacles: mockObstacles,
                 pagination: {
                     page: 1,
                     pageSize: total,
                     pageCount: 1,
                     total,
                 },
             }
         }
     },
     fetchActiveObstacles: async (): Promise<Obstacle[]> => {
         const query = buildQuery({
             'fields[0]': 'id',
             'fields[1]': 'name',
             'fields[2]': 'description',
             'fields[3]': 'type',
             'fields[4]': 'isUnlocked',
             'fields[5]': 'isActive',
             'fields[6]': 'updatedAt',
             'filters[isActive][$eq]': true,
             'sort[0]': 'updatedAt:desc',
             'pagination[page]': 1,
             'pagination[pageSize]': 3,
         })
         try {
             const res = await fetch(
                 `https://api.xthirtysix.ru/api/obstacles?${query}`,
             )
             if (!res.ok) throw new Error('Ошибка загрузки активных помех')
             const response = await res.json()
             return response.data
         } catch (error) {
             // Логируем ошибку
             console.error('Ошибка при загрузке активных помех:', error)
             // Возвращаем 3 активные моки, если есть
             return mockObstacles
                 .filter((o) => o.isActive)
                 .sort(
                     (a, b) =>
                         new Date(b.updatedAt).getTime() -
                         new Date(a.updatedAt).getTime(),
                 )
                 .slice(0, 3)
         }
     },
 }
