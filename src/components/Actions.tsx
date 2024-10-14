import { Metadata } from "next";
import Image from "next/image";
import { z } from "zod";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { taskSchema } from "../../data/schema";

type Task = z.infer<typeof taskSchema>;

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker built using Tanstack Table.",
};

// Fetch tasks from the public directory
async function getTasks() {
  const res = await fetch("/tasks.json"); 
  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const tasks = await res.json();
  console.log("Fetched tasks:", tasks); // Log the tasks
  return z.array(taskSchema).parse(tasks);
}


// Use getStaticProps for static generation
export async function getStaticProps() {
  const tasks = await getTasks();
  return {
    props: {
      tasks,
    },
  };
}

// Ensure that this is treated as a server component
const Actions = ({ tasks }: { tasks: Task[] }) => {
  console.log("Tasks in Actions component:", tasks); // Log tasks here

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  );
};

export default Actions;
