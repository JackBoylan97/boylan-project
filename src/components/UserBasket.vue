<template>
  <h1> this is the basket page</h1>
<div>
  <el-table
    :data="basket"
    style="width: 100%"
    max-height="5050">
    <el-table-column #default="scope"
      fixed
      width="150"
      >
       <img 
            :src="`./${scope.row.img}`"
            style="width: 100px; height: 100px"
          >
    </el-table-column>
    <el-table-column
      fixed
      label="Title"
      width="150"
      prop="title"
    >
    </el-table-column>
    <el-table-column
      label="Price"
      width="120"
      prop="price"
    >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="Operations"
      width="120"
    >
      <template>
        <el-button
          @click="dothis()"
          type="text"
          size="small">
          Remove
        </el-button>
      </template>
    </el-table-column>
  </el-table>

</div>
</template>
<script>
import { inject } from 'vue'
import { BasketSymbol } from '../constants/symbols'
export default {
  setup(){
   const basket = inject(BasketSymbol)
     return {
       basket
     }
  },
  data(){
    return{
    }
  },
  methods:{

  },
}
</script>