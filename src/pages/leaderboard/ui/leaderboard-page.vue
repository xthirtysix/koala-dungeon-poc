<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'
import { getAllFollowers } from '@/entities/follower'
import type { Follower } from '@/entities/follower'
import type { TableColumn } from '@nuxt/ui'

const table = useTemplateRef('table')
const data = ref<Follower[]>(getAllFollowers())

const columns: TableColumn<Follower>[] = [
    {
        accessorKey: 'id',
        header: '#',
    },
    {
        accessorKey: 'name',
        header: 'Имя',
        cell: ({ row }) =>
            h('span', { class: 'font-bold' }, row.getValue('name')),
    },
    {
        accessorKey: 'interferenceSpins',
        header: 'Помехи',
    },
    {
        accessorKey: 'helpSpins',
        header: 'Помощь',
    },
    {
        accessorKey: 'contribution',
        header: 'Вклад',
        cell: ({ row }) => `${row.getValue('contribution')}₽`,
    },
]

const pagination = ref({
    pageIndex: 0,
    pageSize: 10,
})

const selectOptions = ref([5, 10, 15, 20, 50, 100])
const selectValue = ref(10)

watch(selectValue, (value) => {
    pagination.value = {
        ...pagination.value,
        pageSize: value,
    }
})
</script>

<template>
    <UTable
        ref="table"
        v-model:column-pinning="columnPinning"
        v-model:pagination="pagination"
        :data="data"
        :columns="columns"
        :pagination-options="{
            getPaginationRowModel: getPaginationRowModel(),
        }"
        class="flex-1"
    />
    <div class="flex justify-between border-t border-(--ui-border) py-4 px-4">
        <UPagination
            :default-page="
                (table?.tableApi?.getState().pagination.pageIndex || 0) + 1
            "
            :items-per-page="table?.tableApi?.getState().pagination.pageSize"
            :total="table?.tableApi?.getFilteredRowModel().rows.length"
            @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
        />
        <USelect v-model="selectValue" :items="selectOptions" class="w-24" />
    </div>
</template>
