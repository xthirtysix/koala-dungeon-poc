<script setup lang="ts">
import { UBadge } from '#components'
import data, { type Interference } from '../data/interferences-data'
import { getPaginationRowModel } from '@tanstack/vue-table'

const table = useTemplateRef('table')

const logs = computed<Interference[]>(() => {
    return data.map((i, index) => ({
        index: index + 1,
        label: i.label,
        type: i.type,
        content: i.description,
    }))
})

const columns = [
    {
        accessorKey: 'index',
        header: '#',
        maxSize: 5,
    },
    {
        accessorKey: 'label',
        header: 'Помеха',
        maxSize: 50,
        cell: ({ row }) =>
            h('span', { class: 'font-bold' }, row.getValue('label')),
    },
    {
        accessorKey: 'type',
        header: 'Тип',
        maxSize: 50,
        cell: ({ row }) => {
            return h(
                UBadge,
                {
                    class: 'capitalize',
                    variant: 'subtle',
                    color: row.getValue('type').includes('Одно')
                        ? 'success'
                        : 'info',
                },
                () =>
                    row
                        .getValue('type')
                        .trim(' ')
                        .split(' ')[0]
                        .replace('.', ''),
            )
        },
    },
    {
        accessorKey: 'content',
        header: 'Описание',
        maxSize: 200,
        enableResizing: true,
        cell: (info) =>
            h('div', { class: 'truncate w-[45vw]' }, info.getValue()),
    },
]

const ui = {
    root: 'overflow-x-auto w-full',
    base: 'w-full',
}

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
        v-model:pagination="pagination"
        :data="logs"
        :columns="columns"
        :ui="ui"
        :pagination-options="{
            getPaginationRowModel: getPaginationRowModel(),
        }"
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
