//abhi is code m ek jgh useEeffect lgana h lakin muje aata nhi abhi vo sooo alg alg delete function bnane
//pde and function props m pass krne nhi aate so.. sb component ek hi page m h.....

import { ChangeEvent, Component, ReactNode } from "react";
// import AddTodo from "./AddTodo";
import { ImCross } from "react-icons/im";
import { GrFormAdd } from "react-icons/gr";

type AppProps = {};

type AppState = {
  show: boolean;
  task: string;
  id: number;
  // tasksArray: [string, boolean, number][];
  inCompletedTask: [string, boolean, number][];
  completedTask: [string, boolean, number][];
};
class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      show: false,
      task: "",
      id: 0,
      // tasksArray: [],
      inCompletedTask: [],
      completedTask: [],
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSaveButton = this.handleSaveButton.bind(this);
    this.handleCompleteTask = this.handleCompleteTask.bind(this);
    this.handleIncompleteTask = this.handleIncompleteTask.bind(this);
    this.handleDelete1 = this.handleDelete1.bind(this);
    this.handleDelete2 = this.handleDelete2.bind(this);
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
        inCompletedTask: [
          ...this.state.inCompletedTask,
          [this.state.task, false, this.state.id],
        ],
        task: "",
      });
    }
  }
  handleCompleteTask(e: [string, boolean, number]) {
    const newIncompleted = this.state.inCompletedTask.filter(
      (item) => item != e
    );
    this.setState({
      inCompletedTask: newIncompleted,
      completedTask: [...this.state.completedTask, e],
    });
  }
  handleIncompleteTask(e: [string, boolean, number]) {
    const newCompleted = this.state.completedTask.filter((item) => item != e);
    this.setState({
      completedTask: newCompleted,
      inCompletedTask: [...this.state.inCompletedTask, e],
    });
  }
  handleDelete1(task: any) {
    const UpdateValue = this.state.inCompletedTask.filter((item) => {
      return item !== task;
    });
    this.setState({ inCompletedTask: [...UpdateValue] });
  }
  handleDelete2(task: any) {
    const UpdateValue = this.state.completedTask.filter((item) => {
      return item !== task;
    });
    this.setState({ completedTask: [...UpdateValue] });
  }

  render(): ReactNode {
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

              {this.state.inCompletedTask.length ? (
                this.state.inCompletedTask.map((item) => {
                  return (
                    <div key={item[2]} className="flex gap-2 items-center">
                      <input
                        type="checkbox"
                        onChange={() => {
                          this.handleCompleteTask(item);
                        }}
                      />
                      <h1>{item[0]}</h1>
                      <button
                        onClick={() => {
                          this.handleDelete1(item);
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
          {this.state.completedTask.length ? (
            this.state.completedTask.map((item, index) => {
              return (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked
                    onChange={() => {
                      this.handleIncompleteTask(item);
                    }}
                  />
                  <h1>{item[0]}</h1>
                  <button
                    onClick={() => {
                      this.handleDelete2(item);
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
