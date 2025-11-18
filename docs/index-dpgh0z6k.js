class i extends HTMLElement{static observedAttributes=["title","desc","theme"];constructor(){super();let e=document.createElement("template");e.innerHTML=`
      <div class="container">
        <h2 class="title">default title</h2>
        <p class="desc">default desc</p>
        <slot class="icon" />
      </div>
      <style>
        :host {
          --theme-color: grey;
        }

        .container {
          position: relative;
          overflow: hidden;
          padding: 0.5rem 2rem;
          border-radius: 1rem;
          box-shadow: 0.2rem 0.8rem 0.8rem hsl(from var(--grey-400) h s l / 0.3);
        }

        .container::after {
          content: "";

          position: absolute;
          top: 0;
          left: 0;

          width: 100%;
          height: 0.2rem;

          background-color: var(--theme-color);
        }

        .title {
          margin-block: 1rem 0;
          font-weight: 600;
          font-size: 1.2em;
        }

        .desc {
          margin-block: 0.2rem 0;
          font-weight: 200;
          font-size: 0.8em;
        }

        .icon {
          display: flex;
          justify-content: end;
          margin-block: 1.6rem;
        }
      </style>
    `,this.attachShadow({mode:"open"}).appendChild(e.content.cloneNode(!0))}attributeChangedCallback(e,c,t){let o=(r)=>{let n=this.shadowRoot?.querySelector(r);if(n)return n;throw Error(`Can't find element in component with "${r}"`)};switch(e){case"title":o(".title").textContent=t;break;case"desc":o(".desc").textContent=t;break;case"theme":this.shadowRoot?.host?.setAttribute("style",`--theme-color: var(--${t})`);break}}}customElements.define("card-component",i);
