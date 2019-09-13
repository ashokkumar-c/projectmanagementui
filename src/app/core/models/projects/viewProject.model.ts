export interface Project {
    projectId: number;
    projectName: string;
    setDates: boolean;
    startDate: Date;
    endDate: Date;
    priority: number;
    managerId: number;
    isSuspended: boolean;
    _id: string;
    noOfTasks;
}
