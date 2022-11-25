export const create = (tag = "div", options = {}, children = []) => {
    // A shorthand function for making creating DOM elements and appending child elements to them cleaner
    const node = Object.assign(document.createElement(tag), options);
    if (children.length) node.append(...children);
    return node;
};
