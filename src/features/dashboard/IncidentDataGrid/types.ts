export interface Incident {
  _id: string;
  ticketId: string;
  title: string;
  description: string;
  status: string;
  severity: string;
  type: string;
  category: string;
  assignee?: {
    _id: string;
    name: string;
    email: string;
  };
  reporter: {
    _id: string;
    name: string;
    email: string;
  };
  region: string;
  department: string;
  escalationLevel: string;
  createdAt: string;
  updatedAt: string;
}
