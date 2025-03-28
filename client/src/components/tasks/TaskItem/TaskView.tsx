import { TaskItemProps } from "../../../utils/types";
import { Pencil } from "lucide-react";

const TaskView: React.FC<{ task: TaskItemProps["task"]; handleEdit: () => void }> = ({ task, handleEdit }) => (
    <>
      <div className="pb-10">
        <div className="text-justify max-h-[50px] overflow-y-auto">
          <h3 className="text-lg font-bold text-yellow-800">{task.title}</h3>
        </div>
        <div className="text-justify max-h-[100px] pt-5 overflow-y-scroll scrollbar scrollbar-thumb-yellow-400 scrollbar-track-yellow-100">
          <p className="text-gray-700">{task.description}</p>
        </div>
      </div>
      <div className="p-4 absolute bottom-0 right-0">
        <button
          onClick={handleEdit}
          className="text-sm text-yellow-600 hover:underline"
        >
          <Pencil />
        </button>
      </div>
    </>
  );

  export default TaskView;