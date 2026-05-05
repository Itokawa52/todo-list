export class Component {
    constructor(props = {}) {
        this.props = props;
        this._children = new Map();
    }

    setProps(props) {
        this.props = props;
    }

    getDomNode() {
        this._domNode = this.render();
        return this._domNode;
    }

    update() {
        const newDomNode = this.render();
        this._domNode.replaceWith(newDomNode);
        this._domNode = newDomNode;
    }

    getChild(ComponentClass, key, props = {}) {
        const childKey = `${ComponentClass.name}:${key}`;

        let child = this._children.get(childKey);

        if (!child) {
            child = new ComponentClass(props);
            this._children.set(childKey, child);
        } else {
            child.setProps(props);
        }

        return child;
    }

    removeChild(ComponentClass, key) {
        const childKey = `${ComponentClass.name}:${key}`;
        this._children.delete(childKey);
    }

    render() {}
}
