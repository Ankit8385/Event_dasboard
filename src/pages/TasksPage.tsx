import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, CheckCircle } from "lucide-react";
import TaskForm from "../components/TaskForm";

interface Task {
  _id: string;
  name: string;
  deadline: string;
  status: "Pending" | "Completed";
  event: {
    name: string;
  };
  assignedTo: {
    name: string;
  };
}

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      const data = Array.isArray(response.data) ? response.data : [];
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]);
    }
  };

  const updateTaskStatus = async (
    taskId: string,
    status: "Pending" | "Completed"
  ) => {
    try {
      await axios.patch(`http://localhost:5000/api/tasks/${taskId}`, {
        status,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {task.name}
              </h3>
              <button
                onClick={() =>
                  updateTaskStatus(
                    task._id,
                    task.status === "Pending" ? "Completed" : "Pending"
                  )
                }
                className={`${
                  task.status === "Completed"
                    ? "text-green-600"
                    : "text-gray-400"
                } hover:text-green-700`}
              >
                <CheckCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Event: {task.event?.name || "N/A"}</p>
              <p>Assigned to: {task.assignedTo?.name || "N/A"}</p>
              <p>
                Deadline:{" "}
                {task.deadline
                  ? new Date(task.deadline).toLocaleDateString()
                  : "No deadline"}
              </p>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      task.status === "Completed"
                        ? "bg-green-600"
                        : "bg-indigo-600"
                    }`}
                    style={{
                      width: task.status === "Completed" ? "100%" : "0%",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => deleteTask(task._id)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <TaskForm
          onClose={() => setIsModalOpen(false)}
          onTaskAdded={fetchTasks}
        />
      )}
    </div>
  );
};

export default TasksPage;
