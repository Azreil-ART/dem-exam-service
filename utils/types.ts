export enum IssueType {
  Pending = 'В ожидании',
  InProgress = 'В работе',
  Completed = 'Завершено',
  Rejected = 'Отклонено'
}


export interface Applications {
  id: number;
  equipment: string;
  clientId: number;
  description: string;
  issueType: string;
  executorId?: number | null;
  status: IssueType;
  createdAt: Date;
}

export interface User {
  id: number;
  fullName: string;
  role: string;
  organization: string;
  login: string;
  password: string;
}
