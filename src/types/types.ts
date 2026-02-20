export type IncidentStatus =
  | "open"
  | "in_progress"
  | "resolved"
  | "closed"
  | "reopened"
  | "invalid"
  | "obsolete"
  | "escalated_team";

export type IncidentType =
  | "network"
  | "hardware"
  | "software"
  | "security"
  | "external"
  | "other";
export type IncidentSeverity = "low" | "medium" | "high" | "critical";

export type IncidentCategory =
  | "performance"
  | "availability"
  | "security breach"
  | "data loss"
  | "other";
export type EscalationLevel = "team" | "department" | "external support";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "engineer" | "manager" | "admin";
  teamId: string;
  region: string;
}

export interface Incident {
  _id: string; // MongoDB document id
  ticketId: string;
  title: string;
  description: string;
  id: string;
  type: IncidentType;
  category: IncidentCategory;

  // Ownership
  reporterId: string;
  assigneeId: string | null;
  teamId: string;
  departmentId: string;

  // Escalation & Metrics
  resolvedAt?: string;

  // Metadata for filtering
  region: string;
  tags: string[];

  status: IncidentStatus;
  severity: IncidentSeverity;

  assignee?: string; // ObjectId becomes string in frontend
  reporter: string; // ObjectId becomes string in frontend

  department: string;

  escalationLevel: EscalationLevel;

  createdAt: string; // ISO string from backend
  updatedAt: string; // ISO string from backend
}

export interface IncidentFilters {
  status: IncidentStatus[];
  severity: IncidentSeverity[];
  assigneeId: string | null;
  teamId: string | null;
  region: string | null;
  dateRange: {
    start: string;
    end: string;
  };
  searchTerm: string;
}
export interface IncidentUIState {
  selectedIncidentId: string | null;
  statusFilter: string;
  severityFilter: string;
  isCreateModalOpen: boolean;
}
/* 
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["engineer", "manager", "admin"],
    default: "engineer",
  },
  teamId: { type: Schema.Types.ObjectId, ref: "Team" },
  region: { type: String, required: true }, // e.g., 'US-East', 'EMEA'
});

const IncidentSchema = new Schema(
  {
    ticketId: { type: String, required: true, unique: true }, // e.g., INC-001
    title: { type: String, required: true },
    status: {
      type: String,
      enum: [
        "open",
        "in_progress",
        "resolved",
        "closed",
        "reopened",
        "invalid",
        "obsolete",
      ],
      default: "open",
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      required: true,
    },
    type: {
      type: String,
      enum: ["network", "hardware", "software", "security", "other"],
    },
    escalateTo: {
      type: String,
      enum: ["team", "department", "external support"],
      default: "team",
    },
    assignee: { type: Schema.Types.ObjectId, ref: "User" },
    reporter: { type: Schema.Types.ObjectId, ref: "User" },
    // Denormalized for fast filtering
    department: String,
    category: String,
  },
  { timestamps: true },
);

// Indexing for your "Filter By" requirements
IncidentSchema.index({ status: 1, severity: 1, assignee: 1 });

// A "Clean" way to handle your 10+ filters
const getIncidents = async (req, res) => {
  const { status, severity, region, team } = req.query;

  const query = {};
  if (status) query.status = { $in: status.split(",") }; // Handle multiple status filters
  if (severity) query.severity = severity;
  if (region) query.region = region;

  const incidents = await Incident.find(query)
    .populate("assignee", "name email") // Only get what you need
    .sort({ createdAt: -1 });

  res.json(incidents);
};

const ActivityLogSchema = new Schema({
  incidentId: {
    type: Schema.Types.ObjectId,
    ref: "Incident",
    required: true,
    index: true, // Crucial for performance
  },
  actorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  actionType: {
    type: String,
    enum: [
      "STATUS_CHANGE",
      "ASSIGNMENT",
      "ESCALATION",
      "COMMENT_ADDED",
      "SEVERITY_UPDATED",
    ],
    required: true,
  },
  // Store the "Before" and "After" for auditing
  changeDetails: {
    oldValue: Schema.Types.Mixed,
    newValue: Schema.Types.Mixed,
    field: String, // e.g., "status"
  },
  message: String, // Human readable: "John Doe changed status to In Progress"
  timestamp: { type: Date, default: Date.now },
});
 */
