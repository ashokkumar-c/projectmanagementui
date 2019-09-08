export interface ViewProject {
    taskId: number;
    taskName: string;
    isParentTask: boolean;
    priority: number;
    parentTaskId: number;
    startDate: Date;
    endDate: Date;
    projectId: number;
    userId: number;
    isCompleted: boolean;
    _id: string;
}
