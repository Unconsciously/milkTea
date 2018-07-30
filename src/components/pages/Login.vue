<template>
    <div class="login-wrap">
      <img class="bg" src="../../assets/images/bg.jpg" alt="">
        <div class="login-box">
          <div class="ms-title">商家管理后台</div>
         
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-login">
            
              <el-form-item prop="loginName">
                  <el-input v-model="ruleForm.loginName" placeholder="请输入用户名" size="medium"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                  <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" size="medium"></el-input>
              </el-form-item>
              <div class="login-btn">
                  <el-button class="login-ipt" type="success" @click="submitForm('ruleForm')"  @keyup.enter.native="submitForm('ruleForm')" :loading="logining">登录</el-button>
              </div>
              
          </el-form>
        </div>
    </div>
</template>

<script>
import api from "../../utils/api.js";

export default {
  data: function() {
    return {
      logining: false,
      ruleForm: {
        loginName: "",
        password: ""
      },
      rules: {
        loginName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      console.log(formName);
      this.$refs[formName].validate(valid => {
        if (valid) {
          
          this.axios
            .post("/login", this.ruleForm)
            .then(res => {
              if (res.data.status == 200) {
                this.logining = true;
                localStorage.setItem("admin", res.data.result);
                this.$router.push("/");
              } else {
                this.logining = false;
                this.$message.error(res.data.message);
              }
            })
            .then(err => {
              this.logining = false;
              console.log(err);
            });
        } else {
          console.log("error !!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login-wrap {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
  font-size: 30px;
  color: #fff;
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -9;
  }
  .login-box {
    width: 450px;
    background-color: #fff;
    margin: 15% auto;
    box-shadow: 5px 5px 5px #ccc;
    .ms-title {
      font-size: 30px;
      color: #333;
      line-height: 100px;
    }
    .ms-login {
      width: 300px;
      height: 160px;
      margin: 0 auto;
      padding-bottom: 55px;
      border-radius: 5px;
      background: #fff;
      
      .login-btn {
        text-align: center;
        margin-top: 30px;
        .login-ipt {
          width: 100%;
          height: 37px;
        }
      }
    }
  }
}
</style>
