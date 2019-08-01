<template>
  <el-form :model="registerForm" :rules="rules" ref="form" class="from">
    <el-form-item prop="username" class="form-item">
      <el-input v-model="registerForm.username" placeholder="用户名/手机"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="registerForm.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="nickname" class="form-item">
      <el-input v-model="registerForm.nickname" placeholder="请输入昵称"></el-input>
    </el-form-item>
    <el-form-item prop="password" class="form-item">
      <el-input type="password" v-model="registerForm.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass" class="form-item" placeholder="确认密码">
      <el-input
        type="password"
        v-model="registerForm.checkPass"
        autocomplete="off"
        placeholder="确认密码"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="submit" @click.enter="handleRegisterForm">注册</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    // rule验证
    // value密码框的值
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: "",
        password: "",
        nickname: "",
        captcha: "",
        checkPass: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        checkPass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    //   注册提交数据
    handleRegisterForm() {
      this.$refs.form.validate(valid => {
        console.log(this.$refs.form);
        if (valid) {
            // 把checkPass结构出来,因为确认密码不需要提交给后台
            let {checkPass,...from}=this.registerForm
          this.$axios({
            url: "/accounts/register",
            method: "post",
            data:from
          }).then(res => {
            // console.log(res);
            // console.log(this.$store);
            this.$store.commit('users/setUser',res.data)
            this.$router.push('/')
          });
        } else {
          this.$message({
            message: "用户名字或者密码错误",
            type: "error"
          });
        }
      });
    },
    // 验证码
    handleSendCaptcha() {
      if (!this.registerForm.username) {
        this.$message({
          message: "用户名不能为空",
          type: "warning"
        });
        //   不发请求
        return false;
      }
      //   console.log('验证码');
      this.$axios({
        url: "/captchas",
        method: "post",
        data: { tel: this.registerForm.username }
      }).then(res => {
        console.log(res.data.code);
        //   结构赋值,把code从res.data中结构出来
        let { code } = res.data;
        this.$confirm(`模拟手机验证码为：${code}`, "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
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

.submit {
  width: 80%;
  margin: 0px 0px 10px 40px;
}
</style>