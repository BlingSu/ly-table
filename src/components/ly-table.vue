<template>
  <div class="ly-table">
    <el-table
      ref="lyTable"
      v-bind="$attrs"
      v-on="$listeners"
      :data="data"
      :span-method="this.merge ? this.mergeMethod : this.spanMethod">
      <ly-column
        v-bind="$attrs"
        v-for="(item, index) in column"
        :key="index"
        :column="item"></ly-column>
    </el-table>
    <el-pagination
      class="ly-table-pagination"
      v-if="pagination"
      v-bind="$attrs"
      v-on="$listeners"
      @current-change="paginationCurrentChange"
      :style="{ 'margin-top': paginationTop, 'text-align': paginationAlign }"
    ></el-pagination>
  </div>
</template>

<script>
  import LyColumn from './ly-column.vue'
  export default {
    name: 'LyTable',
    props: {
      column: Array,
      data: Array,
      spanMethod: Function,
      pagination: {
        type: Boolean,
        default: false
      },
      paginationTop: {
        type: String,
        default: '15px'
      },
      paginationAlign: {
        type: String,
        default: 'right'
      },
      merge: Array
    },
    components: {
      LyColumn
    },

    data () {
      return {
        mergeLine: {},
        mergeIndex: {}
      }
    },

    created () {
      this.getMergeArr(this.data, this.merge)
    },

    computed: {
      dataLength () {
        return this.data.length
      }
    },

    methods: {
      clearSelection () {
        this.$refs.lyTable.clearSelection()
      },
      toggleRowSelection (row, selected) {
        this.$refs.lyTable.toggleRowSelection(row, selected)
      },
      toggleAllSelection () {
        this.$refs.lyTable.toggleAllSelection()
      },
      toggleRowExpansion (row, expanded) {
        this.$refs.lyTable.toggleRowExpansion(row, expanded)
      },
      setCurrentRow (row) {
        this.$refs.lyTable.setCurrentRow(row)
      },
      clearSort () {
        this.$refs.lyTable.clearSort()
      },
      clearFilter (columnKey) {
        this.$refs.lyTable.clearFilter(columnKey)
      },
      doLayout () {
        this.$refs.lyTable.doLayout()
      },
      sort (prop, order) {
        this.$refs.lyTable.sort(prop, order)
      },
      paginationCurrentChange (val) {
        this.$emit('p-current-change', val)
      },
      getMergeArr (tableData, merge) {
        if (!merge) return
        this.mergeLine = {}
        this.mergeIndex = {}
        merge.forEach((item, k) => {
          tableData.forEach((data, i) => {
            if (i === 0) {
              this.mergeIndex[item] = this.mergeIndex[item] || []
              this.mergeIndex[item].push(1)
              this.mergeLine[item] = 0
            } else {
              if (data[item] === tableData[i - 1][item]) {
                this.mergeIndex[item][this.mergeLine[item]] += 1
                this.mergeIndex[item].push(0)
              } else {
                this.mergeIndex[item].push(1)
                this.mergeLine[item] = i
              }
            }
          })
        })
      },
      mergeMethod ({ row, column, rowIndex, columnIndex }) {
        const index = this.merge.indexOf(column.property)
        if (index > -1) {
          const _row = this.mergeIndex[this.merge[index]][rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      }
    },
    watch: {
      merge () {
        this.getMergeArr(this.data, this.merge)
      },
      dataLength () {
        this.getMergeArr(this.data, this.merge)
      }
    }
  }
</script>
