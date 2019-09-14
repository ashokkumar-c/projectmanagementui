export interface Project {
    projectId: number;
    projectName: string;
    setDates: boolean;
    startDate: Date;
    endDate: Date;
    priority: number;
    managerId: number;
    managerName: string;
    isSuspended: boolean;
    _id: string;
    noOfTasks: number;
}
