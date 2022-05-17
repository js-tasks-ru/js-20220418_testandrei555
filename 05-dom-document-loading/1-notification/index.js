export default class NotificationMessage {
   constructor(str = "", {duration = 0, type = "error"} = {}) {
      this.str = str;
      this.duration = duration;
      this.type = type;

      this.element = this.notificationElement();
   }

   show(div) {
      if (div && div.nodeType === 1) {
         this.element = div;
      }

      setTimeout(() => this.remove(), this.duration);

      if (this.element.outerHTML === document.body.lastElementChild.outerHTML) {
         document.body.lastElementChild.remove();
      }

      document.body.append(this.element);
   }

   destroy() {
      return this.element.remove();
   }

   remove() {
      return this.element.remove();
   }

   notificationElement() {
      const div = document.createElement("div");
      div.innerHTML = `
         <div class="notification ${this.type}" style="--value:${this.duration}ms">
            <div class="timer"></div>
            <div class="inner-wrapper">
               <div class="notification-header">${this.type}</div>
               <div class="notification-body">
                  ${this.str}
               </div>
            </div>
         </div>
      `;
      return div.firstElementChild;
   }
}
