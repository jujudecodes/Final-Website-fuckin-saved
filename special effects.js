// JavaScript Document



const cursorPointer = document.querySelector(".js-cursor__pointer");
const cursorFollow = document.querySelector(".js-cursor__follow");
const cursorFollowActiveBuffer = 16;
const button = document.querySelectorAll(".js-button");
let cursorPosX = 0;
let cursorPosY = 0;
let buttonHoverFlag = false;

const mouseMoveCursor = (element, event, friction) => {
  cursorPosX += (event.clientX - cursorPosX) * friction;
  cursorPosY += (event.clientY - cursorPosY) * friction;
  element.style.transform = `translate(${
    cursorPosX - element.clientWidth / 2
  }px,${cursorPosY - element.clientHeight / 2}px)`;
};

window.addEventListener("mousemove", (e) => {
  if (buttonHoverFlag === true) {
    return;
  }
  mouseMoveCursor(cursorPointer, e, 1.0);
  mouseMoveCursor(cursorFollow, e, 1.0);
});

for (let i = 0; i < button.length; i++) {
  button[i].addEventListener("mousemove", (e) => {
    buttonHoverFlag = true;
    cursorPointer.style.backgroundColor = "transparent";
    cursorFollow.style.transform = `translate(${
      e.target.getBoundingClientRect().left - cursorFollowActiveBuffer
    }px,${e.target.getBoundingClientRect().top - cursorFollowActiveBuffer}px)`;
    cursorFollow.style.width = e.target.getBoundingClientRect().width + "px";
    cursorFollow.style.height = e.target.getBoundingClientRect().height + "px";
    cursorFollow.style.padding = cursorFollowActiveBuffer + "px";
    cursorFollow.style.borderRadius = 0;
  });
}

for (let i = 0; i < button.length; i++) {
  button[i].addEventListener("mouseleave", () => {
    buttonHoverFlag = false;
    cursorPointer.style.backgroundColor = "#fff";
    cursorFollow.style.width = 10 + "px";
    cursorFollow.style.height = 10 + "px";
    cursorFollow.style.padding = 32 + "px";
    cursorFollow.style.borderRadius = "100%";
  });
}

// Vue.js ver
const app = Vue.createApp({
  data() {
    return {
      items: [{ page: "about" }, { page: "works" }, { page: "contact" }],
      cursorPosX: 0,
      cursorPosY: 0,
      cursorFollowActiveBuffer: 16,
      buttonHoverFlag: false
    };
  },
  mounted() {
    this.cursorPointer = this.$refs.cursorPointer;
    this.cursorFollow = this.$refs.cursorFollow;
    this.button = document.querySelectorAll(".js-button");

    window.addEventListener("mousemove", (e) => {
      if (this.buttonHoverFlag === true) {
        return;
      }
      this.mouseMoveCursor(this.cursorPointer, e, 1.0);
      this.mouseMoveCursor(this.cursorFollow, e, 1.0);
    });

    this.onMouseMove();
    this.onMouseLeave();
  },
  methods: {
    mouseMoveCursor(element, event, friction) {
      this.cursorPosX += (event.clientX - this.cursorPosX) * friction;
      this.cursorPosY += (event.clientY - this.cursorPosY) * friction;
      element.style.transform = `translate(${
        this.cursorPosX - element.clientWidth / 2
      }px,${this.cursorPosY - element.clientHeight / 2}px)`;
    },
    onMouseMove() {
      for (let i = 0; i < this.button.length; i++) {
        this.button[i].addEventListener("mousemove", (e) => {
          this.buttonHoverFlag = true;
          this.cursorPointer.style.backgroundColor = "transparent";
          this.cursorFollow.style.transform = `translate(${
            e.target.getBoundingClientRect().left -
            this.cursorFollowActiveBuffer
          }px,${
            e.target.getBoundingClientRect().top - this.cursorFollowActiveBuffer
          }px)`;
          this.cursorFollow.style.width =
            e.target.getBoundingClientRect().width + "px";
          this.cursorFollow.style.height =
            e.target.getBoundingClientRect().height + "px";
          this.cursorFollow.style.padding =
            this.cursorFollowActiveBuffer + "px";
          this.cursorFollow.style.borderRadius = 0;
        });
      }
    },
    onMouseLeave() {
      for (let i = 0; i < this.button.length; i++) {
        this.button[i].addEventListener("mouseleave", () => {
          this.buttonHoverFlag = false;
          this.cursorPointer.style.backgroundColor = "#fff";
          this.cursorFollow.style.width = 10 + "px";
          this.cursorFollow.style.height = 10 + "px";
          this.cursorFollow.style.padding = 32 + "px";
          this.cursorFollow.style.borderRadius = "100%";
        });
      }
    }
  }
});

app.mount("#app");
