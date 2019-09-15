export interface EditTask {
    taskId: number;
    taskName: string;
    isParentTask: boolean;
    priority: number;
    parentTaskId: number;
    parentTaskName: string;
    startDate: Date;
    endDate: Date;
    projectId: number;
    projectName: string;
    userId: number;
    userName: string;
}
