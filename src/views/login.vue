<!--
 * @Author: 何元鹏
 * @Date: 2021-02-18 11:44:09
 * @LastEditors: 何元鹏
 * @LastEditTime: 2021-09-14 15:29:03
-->
<template>
  <div class="sign-In">
    <div class="sign-title">
      天行健，君子以自强不息
    </div>
    <div class="sign-content">
      <div class="sign-content-one">
        <div class="time1">
          <span class="moment1">{{ time }}</span>
        </div>
        <div class="time2">
          <span class="date1">{{ date }}</span>
          <span class="date2">{{ day }}</span>
        </div>
      </div>
      <div class="sign-content-two" @keyup.enter="handleSubmit">
        <div class="sign-content-title">欢迎登录</div>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
          <FormItem prop="user">
            <template slot="label">
              <span class="label-text">用户</span>
            </template>
            <Input
              v-model="formInline.user"
              type="text"
              size="default"
              placeholder="请输入用户名"
              prefix="ios-person-outline"
            />
          </FormItem>
          <FormItem label="密码" prop="password">
            <i-input
              type="password"
              v-model="formInline.password"
              placeholder="请输入密码"
              prefix="ios-eye-off"
            ></i-input>
          </FormItem>
          <FormItem>
            <CheckboxGroup v-model="formInline.checkbox">
              <Checkbox label="记住密码" class="save-pwd-btn"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem>
            <Button style="primary" @click="handleSubmit" class="form-button"
              >登录</Button
            >
          </FormItem>
        </Form>
      </div>
      <iframe
        width="100%"
        height="100%"
        :src="src"
        frameborder="0"
        ref="iframe"
        id="myframe"
      ></iframe>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      captchaImg: "",
      formInline: {
        user: "",
        checkbox: [],
        password: "",
        captcha: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "用户密码不能为空",
            trigger: "blur"
          }
        ],
        captcha: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (value === "") {
                callback("验证码不能为空");
              } else {
                callback();
              }
            }
          }
        ]
      },
      time: "",
      src: ""
    };
  },
  mounted() {
    const date = new Date();
    const mins =
      parseFloat(date.getMinutes()) < 10
        ? "0" + parseFloat(date.getMinutes())
        : parseFloat(date.getMinutes());
    this.time = parseFloat(date.getHours()) + ":" + mins;
    setInterval(() => {
      const date = new Date();
      const mins =
        parseFloat(date.getMinutes()) < 10
          ? "0" + parseFloat(date.getMinutes())
          : parseFloat(date.getMinutes());
      this.time = parseFloat(date.getHours()) + ":" + mins;
    }, 20000);
  },
  computed: {
    amOrPm() {
      const date = new Date();
      return date.getHours() < 12 ? "am" : "pm";
    },
    date() {
      const date = new Date();
      return (
        date.getFullYear() +
        "年" +
        parseFloat(date.getMonth() + 1) +
        "月" +
        date.getDate() +
        "日"
      );
    },
    day() {
      const date = new Date();
      let convertDay = "";
      switch (date.getDay()) {
        case 0:
          convertDay = "日";
          break;
        case 1:
          convertDay = "一";
          break;
        case 2:
          convertDay = "二";
          break;
        case 3:
          convertDay = "三";
          break;
        case 4:
          convertDay = "四";
          break;
        case 5:
          convertDay = "五";
          break;
        case 6:
          convertDay = "六";
          break;
      }
      return "周" + convertDay;
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.formInline.validate(async valid => {
        if (valid) {
          this.$router.push({ path: "/home" || "/" });
        } else {
          this.$Message.error("请确认登录信息填写完整!");
          return;
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.sign-In {
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  position: relative;
  background: url("../assets/images/login.jpg") no-repeat center;
  background-size: cover;
  overflow: auto;
  .sign-title {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 3rem 0 8rem 5rem;
    font-size: 2.4rem;
    color: #fff;
    font-family: "Microsoft YaHei";
    font-weight: 600;
    text-align: left;
    margin: 0 auto;
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    &::before {
      content: "";
      display: block;
      width: 3.18rem;
      height: 5.21rem;
      margin-right: 0.63rem;
      background-size: cover;
    }
  }
  .sign-content {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 0 15rem 0 7rem;
    flex-direction: row;
    &-one {
      display: flex;
      width: 65%;
      flex-flow: column nowrap;
      align-items: flex-start;
      color: #fff;
      .time1 {
        margin-left: 1rem;
        margin-bottom: 1.5rem;
        .moment1 {
          font-size: 7rem;
          margin-right: 1.5rem;
        }
        .moment2 {
          font-size: 2rem;
        }
      }
      .time2 {
        margin-left: 2rem;
        font-size: 1.5rem;
        .date1 {
          margin-right: 1.5rem;
        }
      }
    }
    &-two {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      flex: 1;
      padding: 2.6rem 2rem;
      background: url("../assets/images/login-form.png") no-repeat center;
      background-size: 100% 100%;
      .sign-content-title {
        margin-bottom: 2.6rem;
        font-size: 1.67rem;
        font-weight: 700;
        color: #3ea8fe;
        text-align: center;
      }
      ::v-deep .ivu-form {
        width: 100%;
        display: flex;
        flex-flow: column;
        align-items: center;
        &-item {
          width: 85%;
          margin-bottom: 0rem;
          &-label {
            &::before {
              content: "";
            }
            font-size: 0.75rem;
            color: #666;
            margin-bottom: 0.25rem;
          }
          .ivu-input {
            height: 40px;
          }
          .ivu-input-prefix,
          .ivu-input-suffix {
            background-color: transparent;
            i {
              line-height: 40px;
            }
          }
          .ivu-form-item-content {
            line-height: 40px;
            margin-bottom: 1rem;
            input {
              background-color: transparent;
              color: #ffffff;
            }
            .ivu-btn {
              height: 40px;
            }
            .save-pwd-btn {
              span {
                color: #666;
              }
            }
          }
          &:last-child {
            margin-top: 4rem;
            width: 85%;
            .form-button {
              width: 100%;
              font-size: 1rem;
              color: #fff;
              background-color: rgba(45, 140, 240, 0.8);
              border-color: rgba(45, 140, 240, 0.8);
            }
          }
        }
      }
    }
  }
}
</style>
