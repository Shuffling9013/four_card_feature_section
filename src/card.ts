type CardAttributes = {
  title: string;
  description: string;
};

class Card extends HTMLElement {
  #elements: Record<keyof CardAttributes, Element>;

  constructor() {
    super();

    const template = document.createElement("template");

    template.innerHTML = /* HTML */ `
      <div>
        <h2>default title</h2>
        <p>default description</p>
        <slot />
      </div>
    `;

    const root = this.attachShadow({ mode: "open" });

    root.appendChild(template.content.cloneNode(true));

    const title = root.querySelector("div h2");
    const description = root.querySelector("div p");

    if (null === title || null === description) {
      throw Error("Can't find element in template");
    }

    this.#elements = { title, description };
  }

  static get observedAttributes(): (keyof CardAttributes)[] {
    return ["title", "description"];
  }

  attributeChangedCallback(
    name: keyof CardAttributes,
    _: string,
    value: string,
  ) {
    this.#elements[name].textContent = value;
  }
}

customElements.define("wc-card", Card);
