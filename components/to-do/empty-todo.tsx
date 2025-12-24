import { ListTodo, Plus } from "lucide-react";
import { Button } from "../ui/button";

const EmptyTodo = ({ handleAddTodo }: { handleAddTodo: () => void }) => {
  return (
    <div className="h-[calc(100vh-158px)] flex flex-col items-center justify-center">
      <ListTodo className="w-16 h-16 text-muted-foreground" />
      <h3 className="mt-4 text-xl font-medium">No todos yet</h3>
      <p className="text-muted-foreground mt-1">Create your first todo to stay productive.</p>
      <Button className="mt-2" onClick={handleAddTodo}>
        <Plus /> Add Todo <ListTodo />
      </Button>
    </div>
  );
};

export default EmptyTodo;
