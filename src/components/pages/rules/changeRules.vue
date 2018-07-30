<template>
    <div class="change-rules">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="from">
        <el-form-item label="级别" prop="attrLevel">
          <el-select class="ipt" size="medium" v-model="ruleForm.attrLevel" placeholder="请选择级别">
            <el-option label="一级" value="1"></el-option>
            <el-option label="二级" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="属性值" prop="attrValue">
          <el-input class="ipt" size="medium" v-model="ruleForm.attrValue" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input class="ipt" type="number" size="medium" v-model="ruleForm.sort" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="disabled">
          <el-radio-group v-model="ruleForm.disabled" fill="#85CE61">
            <el-radio label="false">启用</el-radio>
            <el-radio label="true">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      
        <el-form-item class="wrap-opts">
          <el-button type="success" @click="submitForm('ruleForm')" icon="el-icon-check">保存</el-button>
          <el-button @click="backRules()" icon="el-icon-back">返回</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>
<script>
import api from "../../../utils/api.js";

export default {
  props: ["rulesF", "handleFn", "id"],
  data() {
    var validateSort = (rule, value, callback) => {
      if (value == "") {
        callback();
      } else if (!/^[1-9]\d*$/.test(value)) {
        callback(new Error("排序序号必须为正整数!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: this.rulesF,
      optStatu: this.handleFn,
      rules: {
        attrLevel: [
          { required: true, message: "请选择级别", trigger: "change" }
        ],
        attrValue: [
          { required: true, message: "请输入属性值", trigger: "blur" }
        ],
        sort: [
          {
            validator: validateSort,
            trigger: "blur"
          }
        ]
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.addRules(this.ruleForm);
          if (this.optStatu == "add") {
            this.addRules(this.ruleForm);
          } else if (this.optStatu == "edit") {
            let rObj = { ...this.ruleForm, id: this.id };
            this.editRules(rObj);
          }
        } else {
          return false;
        }
      });
    },
    addRules(rules) {
      this.axios
        .post(api.attribute, rules)
        .then(res => {
          if (
            res.status == 200 &&
            res.data.status == 200 &&
            res.data.result == 1
          ) {
            this.$alert("提示", "操作成功，返回列表", {
              confirmButtonText: "确定",
              callback: action => {
                // this.$router.push("/rules");
                this.$router.back();
              }
            });
          } else if (res.data.code == "1000005") {
            this.$alert("提示", res.data.message, {
              confirmButtonText: "确定",
              callback: action => {
                this.$router.push("/login");
              }
            });
          } else {
            this.$message.error(res.data.message);
          }
        })
        .then(err => {
          console.log(err);
        });
    },
    editRules(rules) {
      this.axios
        .put(api.attribute, rules)
        .then(res => {
          if (
            res.status == 200 &&
            res.data.status == 200 &&
            res.data.result == 1
          ) {
            this.$alert("提示", "操作成功，返回列表", {
              confirmButtonText: "确定",
              callback: action => {
                this.$router.back();
              }
            });
          } else if (res.data.code == "1000005") {
            this.$alert("提示", res.data.message, {
              confirmButtonText: "确定",
              callback: action => {
                this.$router.push("/login");
              }
            });
          } else {
            this.$message.error(res.data.message);
          }
        })
        .then(err => {
          console.log(err);
        });
    },
    backRules() {
      this.$router.back();
    }
  }
};
</script>
<style lang='less' scoped>
.change-rules {
  .from {
    .ipt {
      width: 441px;
    }
    .wrap-opts {
      margin-top: 55px;

    }
  }
}
</style>
