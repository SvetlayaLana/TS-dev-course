export enum Status {
    TODO = "todo",
    IN_PROGRESS = "in_progress",
    DONE = "done",
}

export enum Priority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
}

export class Task {
    id: string;
    title: string;
    description: string;
    createdAt: Date | string = new Date();
    status: Status;
    priority: Priority;
    deadline: Date | string;

    constructor(id: string, title: string, description: string = "", deadline: Date | string, status: Status, priority: Priority) {
        this.id = id;
        this.title = title;
        this.status = status;
        this.priority = priority;
        this.deadline = deadline;
        this.description = description;
    }

    getTaskInfo() {
        console.log("Task info: ============");
        console.log("id: ", this.id);
        console.log("title: ", this.title);
        console.log("description: ", this.description);
        console.log("status: ", this.status);
        console.log("priority: ", this.priority);
        console.log("deadline: ", this.deadline);
        console.log("createdAt: ", this.createdAt);
    }
}

export class SubTask extends Task {
    parentTask: Task;

    constructor(id: string, title: string, description: string, deadline: string | Date, status: Status, priority: Priority, parentTask: Task) {
        super(id, title, description, deadline, status, priority);
        this.parentTask = parentTask;
    }

    getTaskInfo() {
        super.getTaskInfo();
        console.log("parent task id: ", this.parentTask.id)
    }
}

export class Bug extends Task {
    isBlocker: boolean;

    constructor(id: string, title: string, description: string, deadline: string | Date, status: Status, priority: Priority, isBlocker: boolean) {
        super(id, title, description, deadline, status, priority);
        this.isBlocker = isBlocker;
    }

    getTaskInfo() {
        super.getTaskInfo();
        console.log("is blocker: ", this.isBlocker)
    }
}

export class Story extends Task {
    storyPoints: number;

    constructor(id: string, title: string, description: string, deadline: string | Date, status: Status, priority: Priority, storyPoints: number) {
        super(id, title, description, deadline, status, priority);
        this.storyPoints = storyPoints;
    }

    getTaskInfo() {
        super.getTaskInfo();
        console.log("story points: ", this.storyPoints)
    }
}

export class Epic extends Task {
    epicName: string;

    constructor(id: string, title: string, description: string, deadline: string | Date, status: Status, priority: Priority, epicName: string) {
        super(id, title, description, deadline, status, priority);
        this.epicName = epicName;
    }

    getTaskInfo() {
        super.getTaskInfo();
        console.log("epic name: ", this.epicName)
    }
}