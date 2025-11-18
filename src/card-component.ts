class CardComponent extends HTMLElement {
  static observedAttributes = ["title", "desc", "theme"] as const;

  constructor() {
    super();

    const template = document.createElement("template");

    template.innerHTML = /* HTML */ `
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
    `;

    const root = this.attachShadow({ mode: "open" });
    root.appendChild(template.content.cloneNode(true));
  }

  attributeChangedCallback(
    name: (typeof CardComponent.observedAttributes)[number],
    _: string,
    value: string,
  ) {
    const getElement = (query: string) => {
      const ele = this.shadowRoot?.querySelector(query);
      if (ele) {
        return ele;
      }
      throw Error(`Can't find element in component with "${query}"`);
    };

    switch (name) {
      case "title":
        getElement(".title").textContent = value;
        break;

      case "desc":
        getElement(".desc").textContent = value;
        break;

      case "theme":
        this.shadowRoot?.host?.setAttribute(
          "style",
          `--theme-color: var(--${value})`,
        );
        break;
    }
  }
}

customElements.define("card-component", CardComponent);
