webpackJsonp([14],{"3jL2":function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});t("VsUZ");var o={data:function(){return{ruleForm:{loginName:"admin",password:"123123"},rules:{loginName:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]}}},methods:{submitForm:function(e){var r=this;console.log(e),this.$refs[e].validate(function(e){if(!e)return console.log("error !!"),!1;r.axios.post("/login",r.ruleForm).then(function(e){200==e.data.status?(localStorage.setItem("admin",e.data.result),r.$router.push("/")):r.$message.error(e.data.message)}).then(function(e){console.log(e)})})}}},s={render:function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"login-wrap"},[t("div",{staticClass:"ms-title"},[e._v("商家管理后台")]),e._v(" "),t("div",{staticClass:"ms-login"},[t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"0px"}},[t("el-form-item",{attrs:{prop:"loginName"}},[t("el-input",{attrs:{placeholder:"loginName"},model:{value:e.ruleForm.loginName,callback:function(r){e.$set(e.ruleForm,"loginName",r)},expression:"ruleForm.loginName"}})],1),e._v(" "),t("el-form-item",{attrs:{prop:"password"}},[t("el-input",{attrs:{type:"password",placeholder:"password"},model:{value:e.ruleForm.password,callback:function(r){e.$set(e.ruleForm,"password",r)},expression:"ruleForm.password"}})],1),e._v(" "),t("div",{staticClass:"login-btn"},[t("el-button",{attrs:{type:"success"},on:{click:function(r){e.submitForm("ruleForm")}},nativeOn:{keyup:function(r){if(!("button"in r)&&e._k(r.keyCode,"enter",13,r.key,"Enter"))return null;e.submitForm("ruleForm")}}},[e._v("登录")])],1)],1)],1)])},staticRenderFns:[]};var l=t("VU/8")(o,s,!1,function(e){t("DHBv")},"data-v-5d0b35b9",null);r.default=l.exports},DHBv:function(e,r){}});
//# sourceMappingURL=14.c4d6ecfc85ac70923329.js.map