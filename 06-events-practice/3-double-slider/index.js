export default class DoubleSlider {
   constructor({
      min = 0,
      max = 0,
      selected = {
         from: min,
         to: max
      },
      formatValue = value => value,
   } = {}) {
      this.min = min;
      this.max = max;
      this.selected = selected;
      this.formatValue = formatValue;

      this.element = this.rangeSlider();
      this.addEventListener();
   }

   addEventListener() {
      const progress = this.element.querySelector(".range-slider__progress");
      const sliderLeft = this.element.querySelector(".range-slider__thumb-left");
      const sliderRight = this.element.querySelector(".range-slider__thumb-right");
      const sliderInner = this.element.querySelector(".range-slider__inner");
      const from = this.element.querySelector("[data-element=from]");
      const to = this.element.querySelector("[data-element=to]");

      const max = this.max;
      const min = this.min;
      const formatValue = this.formatValue;
      const delta = max - min;

      const leftSelected = (this.selected.from - min) * 100 / delta;
      const rightSelected = (max - this.selected.to) * 100 / delta;

      sliderLeft.style.left = leftSelected + "%";
      sliderRight.style.right = rightSelected + "%";
      progress.style.left = leftSelected + "%";
      progress.style.right = rightSelected + "%";

      from.innerHTML = `${formatValue(this.selected.from)}`;
      to.innerHTML = `${formatValue(this.selected.to)}`;


      this.element.addEventListener("pointerdown", event => {
         const thumbLeft = event.target.closest(".range-slider__thumb-left");
         const thumbRight = event.target.closest(".range-slider__thumb-right");

         document.addEventListener("pointermove", sliderMove);

         document.addEventListener("pointerup", () => {
            document.removeEventListener("pointermove", sliderMove);
         });


         const rangeSelect = new CustomEvent("range-select", {
            bubbles: true,
            detail: {
               from: +from.innerHTML.slice(1),
               to: +to.innerHTML.slice(1)
            }
         });
         this.element.dispatchEvent(rangeSelect);


         function sliderMove(event) {
            const left = event.clientX - sliderInner.getBoundingClientRect().left ;
            let leftRelative = left / sliderInner.offsetWidth;

            if (leftRelative < 0) {
               leftRelative = 0;
            } else if (leftRelative > 1) {
               leftRelative = 1;
            }

            const leftPercents = leftRelative * 100;

            if (thumbLeft) {
               thumbLeft.style.left = leftPercents + "%";
               progress.style.left = leftPercents + "%";
            }


            const right = sliderInner.getBoundingClientRect().right - event.clientX;
            let rightRelative = right / sliderInner.offsetWidth;

            if (rightRelative < 0) {
               rightRelative = 0;
            } else if (rightRelative > 1) {
               rightRelative = 1;
            }

            const rightPercents = rightRelative * 100;

            if (thumbRight) {
               thumbRight.style.right = rightPercents + "%";
               progress.style.right = rightPercents + "%";
            }


            if (parseFloat(progress.style.left) + parseFloat(progress.style.right) > 100) {
               if (thumbLeft) {
                  thumbLeft.style.left = 100 - parseFloat(progress.style.right) + "%";
                  progress.style.left = 100 - parseFloat(progress.style.right) + "%";
               }

               if (thumbRight) {
                  thumbRight.style.right = 100 - parseFloat(progress.style.left) + "%";
                  progress.style.right = 100 - parseFloat(progress.style.left) + "%";
               }
            }


            const fromValue = min + delta * parseFloat(progress.style.left) / 100;
            const toValue = max - delta * parseFloat(progress.style.right) / 100;

            from.innerHTML = `${formatValue(Math.round(fromValue))}`;
            to.innerHTML = `${formatValue(Math.round(toValue))}`;
         }
      });
   }

   destroy() {
      return this.element.remove();
   }

   rangeSlider() {
      const div = document.createElement("div");
      div.innerHTML = `
         <div class="range-slider">
            <span data-element="from"></span>
            <div class="range-slider__inner">
               <span class="range-slider__progress"></span>
               <span class="range-slider__thumb-left"></span>
               <span class="range-slider__thumb-right"></span>
            </div>
            <span data-element="to"></span>
         </div>
      `;
      return div.firstElementChild;
   }
}
