webpackJsonp([1],{"5zde":function(t,e,a){a("zQR9"),a("qyJz"),t.exports=a("FeBl").Array.from},"7nRM":function(t,e,a){"use strict";e.__esModule=!0;var s,o=a("c/Tr"),i=(s=o)&&s.__esModule?s:{default:s};e.default=function(t){return Array.isArray(t)?t:(0,i.default)(t)}},"Onn/":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("VsUZ");var s=a("/9V0"),o=a("Uv8r"),i={data:function(){return{cardsForm:{giftName:"",term:"",instructions:"",receiveInstructions:"",fileList:[],goodsList:[],sort:"",disabled:"false"}}},components:{vTitle:s.a,vCards:o.a},methods:{}},r={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"create-rules"},[e("v-title",{attrs:{title:"创建礼品卡"}}),this._v(" "),e("v-cards",{attrs:{cardsF:this.cardsForm,handleFn:"add",id:"000"}})],1)},staticRenderFns:[]};var l=a("VU/8")(i,r,!1,function(t){a("ahk8")},"data-v-4dfca884",null);e.default=l.exports},Uv8r:function(t,e,a){"use strict";var s=a("Dd8w"),o=a.n(s),i=a("7nRM"),r=a.n(i),l=a("VsUZ"),n={props:["cardsF","handleFn","id"],data:function(){return{cardsForm:this.cardsF,optStatu:this.handleFn,dialogTableVisible:!1,goodsData:[],multipleSelection:[],isGoV:!1,getRowKeys:function(t){return t.id},pages:{currentPage:1,totalPages:5},rules:{giftName:[{required:!0,message:"请输入商品名字",trigger:"blur"}],fileList:[{required:!0,message:"请上传商品主图",trigger:"change"}],term:[{required:!0,validator:function(t,e,a){""==e?a(new Error("不可为空!")):/^[1-9]\d*$/.test(e)?a():a(new Error("必须为正整数!"))},trigger:"blur"}],sort:[{required:!1,validator:function(t,e,a){""==e?a():/^[1-9]\d*$/.test(e)?a():a(new Error("必须为正整数!"))},trigger:"blur"}],details:[{required:!0,message:"请输入商品详情",trigger:"change"}]}}},components:{},watch:{cardsForm:{handler:function(t,e){t.goodsList.length>0&&(this.multipleSelection=t.goodsList)},deep:!0}},methods:{indexMethod:function(t){return t+1},handleCurrentChange:function(t){this.getGoodsList(t)},handleSelectionChange:function(t){var e=this;this.multipleSelection=t,this.selectIds=[],t&&t.forEach(function(t){t&&e.selectIds.push(t.id)})},getGoodsList:function(t){var e=this;this.axios.post(l.a.goodsList,{pageIndex:t,pageSize:5}).then(function(t){200==t.status&&200==t.data.status?(e.$set(e.pages,"currentPage",t.data.result.pageIndex),e.$set(e.pages,"totalPages",t.data.result.pageTotal),t.data.result.result.forEach(function(t){t.disabled?t.disabledStr="下架":t.disabledStr="上架",t.fileList.length>0&&(t.url=t.fileList[0].url)}),e.goodsData=t.data.result.result):"1000005"==t.data.code?e.$alert("提示",t.data.message,{confirmButtonText:"确定",callback:function(t){e.$router.push("/login")}}):e.$message.error(t.data.message)}).then(function(t){console.log(t)}),this.toggleSelection(this.multipleSelection)},openGoodsBox:function(){this.dialogTableVisible=!0,this.getGoodsList(1)},closeGoodsBox:function(){this.dialogTableVisible=!1,console.log(this.multipleSelection)},doDelGoods:function(t){var e=r()(this.multipleSelection).slice(0);console.log(e),this.multipleSelection.forEach(function(a,s){t.id==a.id&&e.splice(s,1)}),this.multipleSelection=e},toggleSelection:function(t){var e=this;this.goodsData.forEach(function(a){var s=!1;t.forEach(function(t){a.id==t.id&&(s=!0)}),s?e.$refs.multipleTable.toggleRowSelection(a,!0):e.$refs.multipleTable.toggleRowSelection(a,!1)})},handleRemove:function(t,e){this.$set(this.cardsForm,"fileList",e)},handleExceed:function(t,e){this.$message.warning("当前限制选择 1 个文件，本次选择了 "+t.length+" 个文件，共选择了 "+(t.length+e.length)+" 个文件")},handleUpload:function(t){var e=this;this.file=t;var a=new FormData;return a.append("file",this.file),a.append("type",1),this.axios({method:"post",url:l.a.upload,data:a,headers:{"Content-Type":"multipart/form-data"}}).then(function(t){if(200==t.status&&200==t.data.status){var a=e.cardsForm.fileList;a.push(t.data.result),e.$set(e.cardsForm,"fileList",a)}else"1000005"==t.data.code?e.$router.push("/login"):e.$message.error(t.data.message)}).then(function(t){console.log(t)}),!1},submitForm:function(t){var e=this;this.isGoV=!0,this.cardsForm.goodsList=this.multipleSelection,this.multipleSelection.length<1||(console.log(this.cardsForm),this.$refs[t].validate(function(t){if(!t)return!1;if("add"==e.optStatu)console.log("add"),e.addCards(e.cardsForm);else if("edit"==e.optStatu){var a=o()({},e.cardsForm,{id:e.id});e.editCards(a),console.log("edit")}}))},addCards:function(t){var e=this;this.axios.post(l.a.giftCard,t).then(function(t){200==t.status&&200==t.data.status&&1==t.data.result?e.$alert("提示","操作成功，返回列表",{confirmButtonText:"确定",callback:function(t){e.$router.back()}}):"1000005"==t.data.code?e.$alert("提示",t.data.message,{confirmButtonText:"确定",callback:function(t){e.$router.push("/login")}}):e.$message.error(t.data.message)}).then(function(t){console.log(t)})},editCards:function(t){var e=this;this.axios.put(l.a.giftCard,t).then(function(t){200==t.status&&200==t.data.status&&1==t.data.result?e.$alert("提示","操作成功，返回列表",{confirmButtonText:"确定",callback:function(t){e.$router.back()}}):"1000005"==t.data.code?e.$alert("提示",t.data.message,{confirmButtonText:"确定",callback:function(t){e.$router.push("/login")}}):e.$message.error(t.data.message)}).then(function(t){console.log(t)})},backCards:function(){this.$router.back()}},created:function(){},mounted:function(){}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"change-cards"},[a("el-form",{ref:"cardsForm",staticClass:"from",attrs:{model:t.cardsForm,rules:t.rules,"label-width":"200px"}},[a("el-form-item",{attrs:{label:"礼品卡名称：",prop:"giftName"}},[a("el-input",{staticClass:"ipt",attrs:{size:"medium",placeholder:"请输入"},model:{value:t.cardsForm.giftName,callback:function(e){t.$set(t.cardsForm,"giftName",e)},expression:"cardsForm.giftName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"礼品卡卡面：",prop:"fileList"}},[a("el-upload",{staticClass:"ipt",attrs:{action:"","list-type":"picture","file-list":t.cardsForm.fileList,limit:3,"before-upload":t.handleUpload,"on-remove":t.handleRemove,"on-exceed":t.handleExceed}},[a("el-button",{attrs:{size:"small",type:"success"}},[t._v("点击上传")]),t._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传jpg/png文件，且不超过500kb，1-6张")])],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"有效期：",prop:"term"}},[a("el-input",{staticClass:"ipt",attrs:{size:"medium",placeholder:"请输入"},model:{value:t.cardsForm.term,callback:function(e){t.$set(t.cardsForm,"term",e)},expression:"cardsForm.term"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"排序：",prop:"sort"}},[a("el-input",{staticClass:"ipt",attrs:{size:"medium",placeholder:"请输入"},model:{value:t.cardsForm.sort,callback:function(e){t.$set(t.cardsForm,"sort",e)},expression:"cardsForm.sort"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"添加商品：",prop:"goodsList"}},[a("el-button",{attrs:{type:"success",size:"small"},on:{click:function(e){t.openGoodsBox()}}},[t._v("相关商品")]),t._v(" "),t.multipleSelection.length>0?a("el-row",{staticClass:"goods-list",attrs:{type:"flex"}},t._l(t.multipleSelection,function(e){return a("el-col",{key:e.id,staticClass:"goods-box",attrs:{span:6}},[a("div",{staticClass:"gb-card"},[a("img",{staticClass:"gb-image",attrs:{src:e.fileList[0].url}}),t._v(" "),a("div",{staticClass:"gb-info"},[a("span",[t._v(t._s(e.goodsName))]),t._v(" "),a("div",[a("el-button",{staticClass:"gb-btn",on:{click:function(a){t.doDelGoods(e)}}},[t._v("删除")])],1)])])])})):t._e(),t._v(" "),t.multipleSelection.length<1&&t.isGoV?a("p",{staticClass:"err-tip"},[t._v("请选择商品！ ")]):t._e()],1),t._v(" "),a("el-form-item",{attrs:{label:"领取页面使用说明：",prop:"instructions"}},[a("el-input",{staticClass:"ipt",attrs:{type:"textarea",autosize:{minRows:3,maxRows:7},placeholder:"请输入"},model:{value:t.cardsForm.instructions,callback:function(e){t.$set(t.cardsForm,"instructions",e)},expression:"cardsForm.instructions"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"领取成功页面使用说明：",prop:"receiveInstructions"}},[a("el-input",{staticClass:"ipt",attrs:{type:"textarea",autosize:{minRows:3,maxRows:7},placeholder:"请输入"},model:{value:t.cardsForm.receiveInstructions,callback:function(e){t.$set(t.cardsForm,"receiveInstructions",e)},expression:"cardsForm.receiveInstructions"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"状态：",prop:"disabled"}},[a("el-radio-group",{model:{value:t.cardsForm.disabled,callback:function(e){t.$set(t.cardsForm,"disabled",e)},expression:"cardsForm.disabled"}},[a("el-radio",{attrs:{label:"false"}},[t._v("启用")]),t._v(" "),a("el-radio",{attrs:{label:"true"}},[t._v("禁用")])],1)],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("cardsForm")}}},[t._v("保存")]),t._v(" "),a("el-button",{on:{click:function(e){t.backCards()}}},[t._v("返回")])],1)],1),t._v(" "),a("el-dialog",{staticClass:"goods-dialog",attrs:{title:"商品列表",visible:t.dialogTableVisible,width:"70%"},on:{"update:visible":function(e){t.dialogTableVisible=e}}},[a("el-table",{ref:"multipleTable",attrs:{data:t.goodsData,"row-key":t.getRowKeys},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55","reserve-selection":!0},model:{value:t.multipleSelection,callback:function(e){t.multipleSelection=e},expression:"multipleSelection"}}),t._v(" "),a("el-table-column",{attrs:{label:"编号",width:"80",align:"center",type:"index",index:t.indexMethod}}),t._v(" "),a("el-table-column",{attrs:{label:"商品主图",width:"180",align:"center"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticClass:"tab-img",attrs:{src:t.row.url}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"goodsName",label:"商品名称",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"stock",label:"库存",width:"200"}}),t._v(" "),a("el-table-column",{attrs:{prop:"price",label:"价格",width:"200"}}),t._v(" "),a("el-table-column",{attrs:{prop:"disabledStr",label:"状态",width:"200"}})],1),t._v(" "),a("div",{staticClass:"pagination-wrap"},[a("el-pagination",{attrs:{"current-page":t.pages.currentPage,"page-size":5,layout:"prev, pager, next, jumper","page-count":t.pages.totalPages},on:{"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.$set(t.pages,"currentPage",e)}}})],1),t._v(" "),a("div",{staticClass:"close-box"},[a("el-button",{on:{click:function(e){t.closeGoodsBox()}}},[t._v("确定")])],1)],1)],1)},staticRenderFns:[]};var d=a("VU/8")(n,c,!1,function(t){a("xLH+")},"data-v-7c3cccfb",null);e.a=d.exports},ahk8:function(t,e){},"c/Tr":function(t,e,a){t.exports={default:a("5zde"),__esModule:!0}},fBQ2:function(t,e,a){"use strict";var s=a("evD5"),o=a("X8DO");t.exports=function(t,e,a){e in t?s.f(t,e,o(0,a)):t[e]=a}},qyJz:function(t,e,a){"use strict";var s=a("+ZMJ"),o=a("kM2E"),i=a("sB3e"),r=a("msXi"),l=a("Mhyx"),n=a("QRG4"),c=a("fBQ2"),d=a("3fs2");o(o.S+o.F*!a("dY0y")(function(t){Array.from(t)}),"Array",{from:function(t){var e,a,o,u,m=i(t),f="function"==typeof this?this:Array,p=arguments.length,g=p>1?arguments[1]:void 0,h=void 0!==g,v=0,b=d(m);if(h&&(g=s(g,p>2?arguments[2]:void 0,2)),void 0==b||f==Array&&l(b))for(a=new f(e=n(m.length));e>v;v++)c(a,v,h?g(m[v],v):m[v]);else for(u=b.call(m),a=new f;!(o=u.next()).done;v++)c(a,v,h?r(u,g,[o.value,v],!0):o.value);return a.length=v,a}})},"xLH+":function(t,e){}});
//# sourceMappingURL=1.c99cd0a64733fb07190e.js.map