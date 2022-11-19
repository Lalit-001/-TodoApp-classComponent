import { ChangeEvent, Component, MouseEvent, ReactNode } from "react";
// import AddTodo from "./AddTodo";
import { ImCross } from "react-icons/im";
import { GrFormAdd } from "react-icons/gr";

type AppProps = {};

type AppState = {
  show: boolean;
  task: string;
  id: number;
  tasksArray: [string, boolean, number][];
};
class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      show: false,
      task: "",
      id: 0,
      tasksArray: [],
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSaveButton = this.handleSaveButton.bind(this);
    this.handleCompleteTask = this.handleCompleteTask.bind(this);
    this.handleIncompleteTask = this.handleIncompleteTask.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleInput(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value == " ") {
      return;
    } else {
      this.setState({ task: e.target.value });
    }
  }

  handleSaveButton() {
    if (this.state.task == "") {
      window.alert("add some task");
    } else {
      this.setState({
        id: this.state.id + 1,
        tasksArray: [
          ...this.state.tasksArray,
          [this.state.task, false, this.state.id],
        ],
        task: "",
      });
    }
  }
  handleCompleteTask(e: ChangeEvent<HTMLInputElement>) {
    const taskId = +e.target.value;
    const task = e.target.name;
    this.state.tasksArray[taskId] = [task, true, taskId];
    this.setState({ tasksArray: [...this.state.tasksArray] });
  }
  handleIncompleteTask(e: ChangeEvent<HTMLInputElement>) {
    const taskId = +e.target.value;
    const task = e.target.name;
    this.state.tasksArray[taskId] = [task, false, taskId];
    this.setState({ tasksArray: [...this.state.tasksArray] });
  }
  handleDelete(task: any) {
    const UpdateValue = this.state.tasksArray.filter((item) => {
      return item !== task;
    });
    this.setState({ tasksArray: [...UpdateValue] });
  }

  render(): ReactNode {
    const incompleteTaks = this.state.tasksArray.filter((item) => {
      return item[1] === false;
    });
    const completeTaks = this.state.tasksArray.filter((item) => {
      return item[1] === true;
    });

    return (
      <div className="">
        <div className="px-6 py-4 border-b border-gray-400">
          <span className="text-xl font-semibold ">Lalit's Todo </span>
        </div>
        <div className="p-8">
          {/* ----------------incomplete task---------------------------------------- */}
          <div>
            <div className="space-y-4 my-4">
              <h1 className="text-xl font-semibold ">Things to do </h1>

              {incompleteTaks.length ? (
                incompleteTaks.map((item, index) => {
                  return (
                    <div key={item[2]} className="flex gap-2 items-center">
                      <input
                        type="checkbox"
                        onChange={this.handleCompleteTask}
                        value={item[2]}
                        name={item[0]}
                      />
                      <h1>{item[0]}</h1>
                      <button
                        onClick={() => {
                          this.handleDelete(item);
                        }}
                      >
                        {" "}
                        <ImCross />
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="text-gray-400"> no todos here</div>
              )}
            </div>
          </div>
          {/* -----------------------------add task  (task form)------------------------------ */}
          {this.state.show ? (
            <div className="flex flex-col px-6 py-4 space-y-3 border border-gray-500 rounded-md shadow-md overflow-hidden my-4">
              <h2 className="text-2xl font-semibold ">Create a todo</h2>
              <input
                onChange={this.handleInput}
                value={this.state.task}
                type="text"
                placeholder="write an article about xState"
                className="px-4 py-2 border border-gray-400 rounded-md md:w-80 focus:outline-yellow-500 "
              ></input>

              <div className="flex gap-3">
                <button
                  onClick={this.handleSaveButton}
                  className="px-4 py-1 font-semibold text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    this.setState({ task: "", show: false });
                  }}
                  className="px-4 py-1 font-semibold border border-gray-400 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            //----------------------------------button component to add task---------------------------
            <div className="space-y-8 my-4">
              <div>
                <div className="relative flex items-center ">
                  <GrFormAdd className="absolute ml-2 text-2xl " />
                  <button
                    onClick={() => {
                      this.setState({ show: true });
                    }}
                    className="py-1 pl-8 pr-4 font-semibold text-white bg-yellow-500 rounded-2xl hover:bg-yellow-600"
                  >
                    Add a todo
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* --------------------------completd task ------------------------ */}
          {completeTaks.length ? (
            completeTaks.map((item, index) => {
              return (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    value={item[2]}
                    name={item[0]}
                    checked
                    onChange={this.handleIncompleteTask}
                  />
                  <h1>{item[0]}</h1>
                  <button
                    onClick={() => {
                      this.handleDelete(item);
                    }}
                  >
                    {" "}
                    <ImCross />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="text-gray-400"> no todos here</div>
          )}
          {/* --------------------------------------------------------------------------- */}
        </div>
      </div>
    );
  }
}

export default App;
