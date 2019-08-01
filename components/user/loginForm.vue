<template class="temp">
  <el-form :model="ruleForm" :rules="rules" ref="form" class="from">
    <el-form-item prop="username" class="form-item">
      <el-input v-model="ruleForm.username" placeholder="用户名/手机"></el-input>
    </el-form-item>
    <el-form-item prop="password" class="form-item">
      <el-input type="password" v-model="ruleForm.password" placeholder="密码"></el-input>
    </el-form-item>
    <p>
      <el-checkbox v-model="checked" class="form-left">自动登录</el-checkbox>
      <nuxt-link to="#" class="form-text">忘记密码?</nuxt-link>
    </p>
    <el-form-item>
      <el-button type="primary" class="submit" @click.enter="handleLoginFrom">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      checked:'',
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleLoginFrom() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$axios({
            url: "/accounts/login",
            method: "post",
            data: this.ruleForm
          }).then(res => {
            console.log(res);
            // console.log(this.$store);
            // 因为vuex插件已帮我们把数据储存在了本地,所以我们调用user文件下的setUser方法即可拿到数据
            this.$store.commit("users/setUser", res.data);
            this.$router.push("/");
          });
        } else {
          this.$message({
            message: "用户名字或者密码错误",
            type: "error"
          });
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
.form {
  padding: 50px;
}

.form-item {
  margin: 20px auto 20px;
  width: 80%;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  float: right;
  line-height: 1;
  margin-right: 40px;
}
.form-left {
  font-size: 12px;
  color: #409eff;
  text-align: left;
  line-height: 1;
  margin-left: 40px;
  float: left;
}
.submit {
  width: 80%;
  margin: 20px 0px 10px 40px;
}
</style>
