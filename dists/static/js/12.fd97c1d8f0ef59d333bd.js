webpackJsonp([12],{VUE7:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("/9V0"),l=a("VsUZ"),r={data:function(){return{cardsData:[],currentPage:1,totalPages:1}},components:{vTitle:n.a},methods:{indexMethod:function(t){return t+1},handleSizeChange:function(t){console.log("每页 "+t+" 条")},handleCurrentChange:function(t){console.log("当前页: "+t)},gecardsList:function(){var t=this;this.axios.post(l.a.giftCardList,{pageIndex:1,pageSize:10}).then(function(e){200==e.status&&200==e.data.status?(t.totalPages=e.data.result.pageTotal,e.data.result.result.map(function(t){return t.disabled?t.disabledStr="禁用":t.disabledStr="启用",t.goodsLen=t.goodsList.length,t.fileList.length>0&&(t.url=t.fileList[0].url),t}),t.cardsData=e.data.result.result):"1000005"==e.data.code?t.$alert("提示",e.data.message,{confirmButtonText:"确定",callback:function(e){t.$router.push("/login")}}):t.$message.error(e.data.message)}).then(function(t){console.log(t)})},addCardsClick:function(){this.$router.push({path:"/addcards"})},editCardsClick:function(t){this.$router.push({path:"/editcards/"+t})}},created:function(){this.gecardsList()}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"rules-page"},[a("v-title",{attrs:{title:"礼品卡管理"}}),t._v(" "),a("div",{staticClass:"opt"},[a("el-button",{attrs:{type:"success"},on:{click:function(e){t.addCardsClick()}}},[t._v("新建礼品卡")])],1),t._v(" "),a("el-table",{staticStyle:{width:"100%","padding-bottom":"1px"},attrs:{data:t.cardsData,border:""}},[a("el-table-column",{attrs:{label:"编号",width:"80",align:"center",type:"index",index:t.indexMethod}}),t._v(" "),a("el-table-column",{attrs:{label:"卡面主图",width:"180",align:"center"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticClass:"tab-img",attrs:{src:t.row.url}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"giftName",label:"卡名",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"sort",label:"排序",width:"180",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"term",label:"有效时段",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"goodsLen",label:"关联商品数",width:"180",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"disabledStr",label:"状态",width:"180",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"100",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.editCardsClick(e.row.id)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.editCardsClick(e.row.id)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("div",{staticClass:"pagination-wrap"},[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-size":10,layout:"prev, pager, next, jumper",total:t.totalPages},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.currentPage=e}}})],1)],1)},staticRenderFns:[]};var i=a("VU/8")(r,s,!1,function(t){a("pG8L")},"data-v-6b817d89",null);e.default=i.exports},pG8L:function(t,e){}});
//# sourceMappingURL=12.fd97c1d8f0ef59d333bd.js.map