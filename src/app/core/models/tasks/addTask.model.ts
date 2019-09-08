export interface AddProject {
    taskName: string;
    isParentTask: boolean;
    priority: number;
    parentTaskId: number;
    startDate: Date;
    endDate: Date;
    projectId: number;
    userId: number;
    isCompleted: boolean;
}
