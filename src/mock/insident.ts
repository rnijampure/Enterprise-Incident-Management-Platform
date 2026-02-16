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
