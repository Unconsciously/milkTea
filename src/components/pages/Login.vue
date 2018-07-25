<template>
    <div class="login-wrap">
        <div class="ms-title">商家管理后台</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="loginName">
                    <el-input v-model="ruleForm.loginName" placeholder="loginName"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="success" @click="submitForm('ruleForm')"  @keyup.enter.native="submitForm('ruleForm')">登录</el-button>
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
      ruleForm: {
        loginName: "admin",
        password: "123123"
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
            .post('/login', this.ruleForm)
            .then(res => {
              if (res.data.status == 200) {
                localStorage.setItem("admin", res.data.result);
                this.$router.push("/");
              } else {
                this.$message.error(res.data.message);
              }
            })
            .then(err => {
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
  top: 30%;
  width: 100%;
  text-align: center;
  font-size: 30px;
  color: #fff;
  .ms-title {
    font-size: 30px;
    color: #333;
  }
  .ms-login {
    width: 300px;
    height: 160px;
    margin: 0 auto;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
    .login-btn {
      text-align: center;
      button {
        width: 100%;
        height: 36px;
      }
    }
  }
}
</style>
