<script setup lang="ts">
import data from '../data/journal-data'
import { getPaginationRowModel } from '@tanstack/vue-table'

const table = useTemplateRef('table')

const logs = computed<JournalLog[]>(() =>
    data
        .filter((log) => log.time && log.event && log.cell)
        .map((log, index) => ({
            index: index + 1,
            ...log,
        })),
)

const columns = [
    {
        accessorKey: 'index',
        header: '#',
        maxSize: 20,
    },
    {
        accessorKey: 'time',
        header: 'Время',
        maxSize: 20,
    },
    {
        accessorKey: 'event',
        header: 'Событие',
        maxSize: 20,
        enableResizing: true,
        cell: (info) =>
            h('div', { class: 'truncate w-[65vw]' }, info.getValue()),
    },
    {
        accessorKey: 'cell',
        header: 'Клетка',
        maxSize: 100,
    },
]

const pagination = ref({
    pageIndex: 0,
    pageSize: 10,
})

const ui = {
    root: 'overflow-x-auto w-full',
    base: 'w-full',
}

const selectOptions = ref([5, 10, 20, 50, 100])
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
