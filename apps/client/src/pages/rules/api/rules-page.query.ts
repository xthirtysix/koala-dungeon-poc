import { rulesApi } from "@/entities/rules";
import { queryOptions } from "@tanstack/vue-query";

export function rulesPageQueryOptions() {
    return queryOptions({
        queryKey: ['rules'],
        queryFn: async () => {
            return rulesApi.getRules()
        },
        staleTime: 1000 * 60 * 60 * 24,
    })
}
