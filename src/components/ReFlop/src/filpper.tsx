import "./filpper.css";
import propTypes from "@/utils/propTypes";
import { defineComponent, ref } from "vue";

const props = {
  // front paper text
  // 前牌文字
  frontText: propTypes.number.def(0),
  // back paper text
  // 后牌文字
  backText: propTypes.number.def(1),
  // flipping duration, please be consistent with the CSS animation-duration value.
  // 翻牌動畫時間，与CSS中設定的animation-duration保持一致
  duration: propTypes.number.def(600)
};

export default defineComponent({
  name: "ReFlop",
  props,
  setup(props) {
    const { frontText, backText, duration } = props;
    const isFlipping = ref(false);
    const flipType = ref("down");
    const frontTextFromData = ref(frontText);
    const backTextFromData = ref(backText);

    const textClass = (number: number) => {
      return "number" + number;
    };

    const flip = (type: string, front: number, back: number) => {
      // 如果处于翻转中，则不執行
      if (isFlipping.value) return false;
      frontTextFromData.value = front;
      backTextFromData.value = back;
      // 根據传递過来的type設定翻转方向
      flipType.value = type;
      // 設定翻转狀態為true
      isFlipping.value = true;

      setTimeout(() => {
        // 設定翻转狀態為false
        isFlipping.value = false;
        frontTextFromData.value = back;
      }, duration);
    };

    // 下翻牌
    const flipDown = (front: any, back: any): void => {
      flip("down", front, back);
    };

    // 上翻牌
    const flipUp = (front: any, back: any): void => {
      flip("up", front, back);
    };

    // 設定前牌文字
    function setFront(text: number): void {
      frontTextFromData.value = text;
    }

    // 設定后牌文字
    const setBack = (text: number): void => {
      backTextFromData.value = text;
    };

    return {
      flipType,
      isFlipping,
      frontTextFromData,
      backTextFromData,
      textClass,
      flipDown,
      flipUp,
      setFront,
      setBack
    };
  },

  render() {
    const main = `m-flipper ${this.flipType} ${this.isFlipping ? "go" : ""}`;
    const front = `digital front ${this.textClass(this.frontTextFromData)}`;
    const back = `digital back ${this.textClass(this.backTextFromData)}`;
    return (
      <div class={main}>
        <div class={front} />
        <div class={back} />
      </div>
    );
  }
});
