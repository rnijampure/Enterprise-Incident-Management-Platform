//incident status: open, in_progress, resolved, closed, reopened, invalid, obsolete
//incident severity: low, medium, high, critical

//esclate to: team, department, external support
//filter by : status, severity, assigned user, team, department, date range, escalation level, region, incident type, incident category

//incident type: network, hardware, software, security, other,
//incident category: performance, availability, security breach, data loss, other

export const mockIncident = [
  {
    id: "INC-1001",
    title: "Server outage in EU region",
    severity: "High",
    status: "open",
    assignedUser: {
      id: "USR-102",
      name: "Jane Doe",
      role: "Engineer",
    },
    createdAt: "2026-02-13T09:30:00Z",
    updatedAt: "2026-02-13T10:15:00Z",
    comments: [
      {
        id: "CMT-501",
        author: {
          id: "USR-101",
          name: "John Smith",
          role: "Admin",
        },
        content: "Investigating the issue, may need to restart the server.",
        createdAt: "2026-02-13T09:45:00Z",
        updatedAt: "2026-02-13T09:50:00Z",
        editHistory: [
          {
            editedAt: "2026-02-13T09:50:00Z",
            previousContent: "Investigating the issue.",
          },
        ],
      },
      {
        id: "CMT-502",
        author: {
          id: "USR-102",
          name: "Jane Doe",
          role: "Engineer",
        },
        content:
          "Server restarted successfully, monitoring system performance.",
        createdAt: "2026-02-13T10:05:00Z",
        updatedAt: "2026-02-13T10:10:00Z",
        editHistory: [],
      },
    ],
  },
];

export const CreateMockIncidents = [
  {
    id: "", // Auto-generated incident ID
    title: "", // User input
    description: "", // User input
    severity: "", // Low / Medium / High / Critical
    status: "Open", // Default status
    type: {
      id: "", // Selected incident type ID
      name: "", // Populated from type reference
      description: "", // Optional
    },
    assignedUser: {
      id: "", // Selected user ID
      name: "", // Populated from user reference
      role: "", // Admin / Engineer / Viewer
      department: {
        id: "", // Department ID
        name: "", // Department name
      },
    },
    team: {
      id: "", // Assigned team ID
      name: "", // Team name
      department: {
        id: "", // Department ID
        name: "", // Department name
      },
    },
    department: {
      id: "", // Department responsible for incident
      name: "",
    },
    createdAt: "", // Auto-set on creation (ISO timestamp)
    updatedAt: "", // Auto-set on updates
    occurredAt: "", // User input or system-set
    resolvedAt: null, // Initially null
    comments: [], // Initially empty array
  },
];

export const mockIncidentTypesFromBackend = {
  total: 50,
  page: 1,
  pages: 5,
  data: [
    {
      _id: "6991dbbd47affb79c4f1a4b5",
      ticketId: "INC-1012",
      title: "OTHER Incident 12",
      description: "This is a availability incident for testing purposes.",
      status: "obsolete",
      severity: "low",
      type: "security",
      category: "performance",
      assignee: {
        _id: "6991dba96b872d185e4861e5",
        name: "Anita Engineer",
        email: "anita.engineer@example.com",
      },
      reporter: {
        _id: "6991dba96b872d185e4861e5",
        name: "Anita Engineer",
        email: "anita.engineer@example.com",
      },
      region: "North America",
      department: "Engineering",
      escalationLevel: "department",
      createdAt: "2026-02-15T05:31:41.598Z",
      updatedAt: "2026-02-15T05:31:41.598Z",
      __v: 0,
    },
    {
      _id: "6991dbbd47affb79c4f1a4ac",
      ticketId: "INC-1003",
      title: "AVAILABILITY Incident 3",
      description: "This is a performance incident for testing purposes.",
      status: "in_progress",
      severity: "low",
      type: "other",
      category: "security breach",
      assignee: {
        _id: "6991dba96b872d185e4861e3",
        name: "Sarah Admin",
        email: "sarah.admin@example.com",
      },
      reporter: {
        _id: "6991dba96b872d185e4861e5",
        name: "Anita Engineer",
        email: "anita.engineer@example.com",
      },
      region: "North America",
      department: "Engineering",
      escalationLevel: "external support",
      createdAt: "2026-01-29T13:24:59.674Z",
      updatedAt: "2026-01-29T13:24:59.674Z",
      __v: 0,
    },
    {
      _id: "6991dbbd47affb79c4f1a4d6",
      ticketId: "INC-1045",
      title: "DATA LOSS Incident 45",
      description: "This is a availability incident for testing purposes.",
      status: "open",
      severity: "high",
      type: "hardware",
      category: "security breach",
      assignee: {
        _id: "6991dba96b872d185e4861e5",
        name: "Anita Engineer",
        email: "anita.engineer@example.com",
      },
      reporter: {
        _id: "6991dba96b872d185e4861e4",
        name: "Marcus Engineer",
        email: "marcus.engineer@example.com",
      },
      region: "North America",
      department: "Security",
      escalationLevel: "department",
      createdAt: "2026-01-16T07:42:14.126Z",
      updatedAt: "2026-01-16T07:42:14.126Z",
      __v: 0,
    },
    {
      _id: "6991dbbd47affb79c4f1a4c8",
      ticketId: "INC-1031",
      title: "DATA LOSS Incident 31",
      description: "This is a performance incident for testing purposes.",
      status: "closed",
      severity: "critical",
      type: "hardware",
      category: "security breach",
      assignee: {
        _id: "6991dba96b872d185e4861e3",
        name: "Sarah Admin",
        email: "sarah.admin@example.com",
      },
      reporter: {
        _id: "6991dba96b872d185e4861e3",
        name: "Sarah Admin",
        email: "sarah.admin@example.com",
      },
      region: "Asia",
      department: "Development",
      escalationLevel: "department",
      createdAt: "2026-01-15T05:27:57.532Z",
      updatedAt: "2026-01-15T05:27:57.532Z",
      __v: 0,
    },
    {
      _id: "6991dbbd47affb79c4f1a4c9",
      ticketId: "INC-1032",
      title: "OTHER Incident 32",
      description: "This is a security breach incident for testing purposes.",
      status: "open",
      severity: "high",
      type: "software",
      category: "performance",
      assignee: {
        _id: "6991dba96b872d185e4861e4",
        name: "Marcus Engineer",
        email: "marcus.engineer@example.com",
      },
      reporter: {
        _id: "6991dba96b872d185e4861e3",
        name: "Sarah Admin",
        email: "sarah.admin@example.com",
      },
      region: "Asia",
      department: "Software",
      escalationLevel: "department",
      createdAt: "2026-01-14T12:28:11.217Z",
      updatedAt: "2026-01-14T12:28:11.217Z",
      __v: 0,
    },
    {
      _id: "6991dbbd47affb79c4f1a4c1",
      ticketId: "INC-1024",
      title: "SECURITY BREACH Incident 24",
      description: "This is a data loss incident for testing purposes.",
      status: "reopened",
      severity: "low",
      type: "security",
      category: "other",
      assignee: {
        _id: "6991dba96b872d185e4861e5",
        name: "Anita Engineer",
        email: "anita.engineer@example.com",
      },
      reporter: {
        _id: "6991dba96b872d185e4861e3",
        name: "Sarah Admin",
        email: "sarah.admin@example.com",
      },
      region: "Asia",
      department: "Software",
      escalationLevel: "external support",
      createdAt: "2026-01-12T23:34:35.727Z",
      updatedAt: "2026-01-12T23:34:35.727Z",
      __v: 0,
    },
    {
      _id: "6991dbbd47affb79c4f1a4d0",
      ticketId: "INC-1039",
      title: "PERFORMANCE Incident 39",
      description: "This is a data loss incident for testing purposes.",
      status: "in_progress",
      severity: "high",
      type: "hardware",
      category: "performance",
      assignee: {
        _id: "6991dba96b872d185e4861e5",
        name: "Anita Engineer",
        email: "anita.engineer@example.com",
      },
      reporter: {
        _id: "6991dba96b872d185e4861e3",
        name: "Sarah Admin",
        email: "sarah.admin@example.com",
      },
      region: "North America",
      department: "Engineering",
      escalationLevel: "department",
      createdAt: "2026-01-12T06:43:21.453Z",
      updatedAt: "2026-01-12T06:43:21.453Z",
      __v: 0,
    },
    {
      _id: "6991dbbd47affb79c4f1a4b2",
      ticketId: "INC-1009",
      title: "DATA LOSS Incident 9",
      description: "This is a security breach incident for testing purposes.",
      status: "reopened",
      severity: "critical",
      type: "security",
      category: "data loss",
      reporter: {
        _id: "6991dba96b872d185e4861e3",
        name: "Sarah Admin",
        email: "sarah.admin@example.com",
      },
      region: "North America",
      department: "Engineering",
      escalationLevel: "department",
      createdAt: "2026-01-10T10:05:24.015Z",
      updatedAt: "2026-01-10T10:05:24.015Z",
      __v: 0,
    },
    {
      _id: "6991dbbd47affb79c4f1a4d7",
      ticketId: "INC-1046",
      title: "DATA LOSS Incident 46",
      description: "This is a security breach incident for testing purposes.",
      status: "in_progress",
      severity: "high",
      type: "other",
      category: "availability",
      assignee: {
        _id: "6991dba96b872d185e4861e3",
        name: "Sarah Admin",
        email: "sarah.admin@example.com",
      },
      reporter: {
        _id: "6991dba96b872d185e4861e3",
        name: "Sarah Admin",
        email: "sarah.admin@example.com",
      },
      region: "North America",
      department: "Security",
      escalationLevel: "department",
      createdAt: "2026-01-09T11:37:43.719Z",
      updatedAt: "2026-01-09T11:37:43.719Z",
      __v: 0,
    },
    {
      _id: "6991dbbd47affb79c4f1a4cf",
      ticketId: "INC-1038",
      title: "SECURITY BREACH Incident 38",
      description: "This is a other incident for testing purposes.",
      status: "open",
      severity: "low",
      type: "software",
      category: "data loss",
      assignee: {
        _id: "6991dba96b872d185e4861e3",
        name: "Sarah Admin",
        email: "sarah.admin@example.com",
      },
      reporter: {
        _id: "6991dba96b872d185e4861e4",
        name: "Marcus Engineer",
        email: "marcus.engineer@example.com",
      },
      region: "North America",
      department: "Security",
      escalationLevel: "team",
      createdAt: "2026-01-07T05:17:12.215Z",
      updatedAt: "2026-01-07T05:17:12.215Z",
      __v: 0,
    },
  ],
};
