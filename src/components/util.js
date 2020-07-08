export default {
  selection: {
    renderHeader: (h, {
      store
    }) => {
      console.log(h, store)
      return (
        <el-checkbox
          disabled= { store.states.data && store.states.data.length === 0 }
          indeterminate = { store.states.selection.length > 0 && !store.states.isAllSelected }
          nativeOn-click = { store.toggleAllSelection }
          value = { store.states.isAllSelected }
          >
        </el-checkbox>
      )
    },
    renderCell: (h, {
      row, column, store, $index
    }) => {
      console.log(h, store)
      return (
        <el-checkbox
          nativeOn-click = { event => event.stopPropagation() }
          value = { store.isSelected(row) }
          disabled = {
            column.selectable
              ? !column.selectable.call(null, row, $index)
              : false
          }
          on-input = { () => {
            store.commit('rowSelectedChanged', row)
          } }
        >
        </el-checkbox>
      )
    },
    sortable: false,
    resizable: false
  },
  index: {
    renderHeader: (h, scope) => {
      return <span>{ scope.column.label || '#' }</span>
    },
    renderCell: (h, {
      $index, column
    }) => {
      let i = $index + 1
      const index = column.index

      if (typeof index === 'number') {
        i = $index + index
      } else if (typeof index === 'function') {
        i = index($index)
      }

      return <div>{ i }</div>
    },
    sortable: false
  },
  expand: {
    renderHeader: (h, scope) => {
      return <span>{ scope.column.label || '' }</span>
    },
    renderCell: (h, {
      row, store,
    }, proxy) => {
      return (
        <div
          class = {
            'el-tabel__expand-icon ' + (expanded ? 'el-tabel__expand-icon--expanded' : '')
          }
          on-click = { e => proxy.handleExpandClick(row, e) } >
          <i class="el-icon el-icon-arrow-right" />
        </div>
      )
    },
    sortable: false,
    resizable: false,
    className: 'el-table__expand-column'
  }
}
