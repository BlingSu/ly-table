<template>
  <el-table-column
    :prop="column.prop"
    :label="column.label"
    :type="column.type"
    :index="column.index"
    :column-key="column.columnKey"
    :width="column.width"
    :min-width="column.minWidth"
    :fixed="column.fixed"
    :render-header="column.renderHeader"
    :sortable="column.sortable || false"
    :sort-method="column.sortMethod"
    :sort-by="column.sortBy"
    :sort-orders="column.sortOrders"
    :resizable="column.resizable || true"
    :formatter="column.formatter"
    :show-overflow-tooltip="column.showOverflowTooltip || false"
    :align="column.align || align || 'left'"
    :header-align="column.headerAlign || headerAlign || column.align || align || 'left'"
    :class-name="column.className"
    :label-class-name="column.labelClassName"
    :selectable="column.selectable"
    :reserve-selection="column.reserveSelection || false"
    :filters="column.filters"
    :filter-placement="column.filterPlacement"
    :filter-multiple="column.filterMultiple"
    :filter-method="column.filterMethod"
    :filtered-value="column.filteredValue">
    <template slot="header" slot-scope="scope">
      <ly-render v-if="column.renderHeader" :scope="scope" :render="column.renderHeader"></ly-render>
      <span v-else>{{ scope.column.label }}</span>
    </template>
    <template slot-scope="scope">
      <ly-render :scope="scope" :render="column.render"></ly-render>
    </template>
    <template v-if="column.children">
      <ly-column v-for="(col, index) in column.children" :key="index" :column="col"></ly-column>
    </template>
  </el-table-column>
</template>

<script>
  import LyRender from './ly-render.vue'
  import util from './util'

  export default {
    name: 'LyColumn',
    props: {
      column: Object,
      headerAlign: String,
      align: String
    },
    components: {
      LyRender
    },
    methods: {
      setColumn () {
        if (this.column.type) {
          this.column.renderHeader = util[this.column.type].renderHeader
          this.column.render = this.column.render || util[this.column.type].renderCell
        }
        if (this.column.formatter) {
          this.column.render = (h, scope) => {
            return <span>{
              scope.column.formatter(scope.row, scope.column, scope.row, scope.$index)
            }</span>
          }
        }
        if (!this.column.render) {
          this.column.render = (h, scope) => {
            return <span>{
              scope.row[scope.column.property]
            }</span>
          }
        }
      }
    },

    watch: {
      column: {
        handler () {
          this.setColumn()
        },
        immediate: true
      }
    }
  }
</script>
