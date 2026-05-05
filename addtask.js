import { Component } from "./component.js";
import { createElement } from "./create_element.js";

export class AddTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: "",
        };

        this.onAddInputChange = this.onAddInputChange.bind(this);
        this.onAddButtonClick = this.onAddButtonClick.bind(this);
    }

    render() {
        return createElement("div", { class: "add-todo" }, [
            createElement(
                "input",
                {
                    id: "new-todo",
                    type: "text",
                    placeholder: "Задание",
                    value: this.state.input,
                },
                null,
                {
                    input: this.onAddInputChange,
                }
            ),

            createElement(
                "button",
                {
                    id: "add-btn",
                    type: "button",
                },
                "+",
                {
                    click: this.onAddButtonClick,
                }
            ),
        ]);
    }

    onAddInputChange(event) {
        this.state.input = event.target.value;
    }

    onAddButtonClick() {
        const text = this.state.input.trim();

        if (text !== "") {
            this.state.input = "";
            this.props.onAddTask(text);
        }
    }
}
