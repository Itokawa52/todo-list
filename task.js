import { Component } from "./component.js";
import { createElement } from "./create_element.js";

export class Task extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDeleteClicked: false,
        };

        this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
    }

    render() {
        const { todo, onCompletedTasks } = this.props;

        const checkboxAttributes = {
            type: "checkbox",
        };

        if (todo.completed) {
            checkboxAttributes.checked = "checked";
        }

        return createElement("li", {}, [
            createElement(
                "input",
                checkboxAttributes,
                null,
                {
                    click: () => onCompletedTasks(todo.id),
                }
            ),

            createElement(
                "label",
                {
                    style: todo.completed ? "color: gray;" : "",
                },
                todo.text
            ),

            createElement(
                "button",
                {
                    style: this.state.isDeleteClicked
                        ? "background: red; color: white;"
                        : "",
                },
                "🗑️",
                {
                    click: this.onDeleteButtonClick,
                }
            ),
        ]);
    }

    onDeleteButtonClick() {
        const { todo, onDelete } = this.props;

        if (!this.state.isDeleteClicked) {
            this.state.isDeleteClicked = true;
            this.update();
            return;
        }

        onDelete(todo.id);
    }
}
