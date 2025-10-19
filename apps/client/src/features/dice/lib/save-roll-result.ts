import { API_URL } from '@/shared/config'
import type { RollResult, SaveRollRequest } from '@/features/dice'

export async function saveRollResult(rollResult: RollResult): Promise<void> {
    const jwt = localStorage.getItem('jwt')

    if (!jwt) {
        throw new Error('Токен авторизации не найден')
    }

    const requestData: SaveRollRequest = {
        data: {
            roll_data: rollResult,
            date: Date.now(),
        },
    }

    try {
        const response = await fetch(`${API_URL}/rolls`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify(requestData),
        })

        if (!response.ok) {
            throw new Error(`Ошибка сохранения результата броска: ${response.status}`)
        }
    } catch (error) {
        console.error('Ошибка при сохранении результата броска:', error)
        throw error
    }
}
