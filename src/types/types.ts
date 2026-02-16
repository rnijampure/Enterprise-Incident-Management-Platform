export type Severity = "low" | "medium" | "high" | "critical";
export type Status =
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

export type IncidentCategory =
  | "performance"
  | "availability"
  | "security breach"
  | "data loss"
  | "other";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "engineer" | "manager" | "admin";
  teamId: string;
  region: string;
}

export interface Incident {
  id: string;
  ticketNumber: string; // e.g., "INC-2024-001"
  title: string;
  description: string;
  status: Status;
  severity: Severity;
  type: IncidentType;
  category: IncidentCategory;

  // Ownership
  reporterId: string;
  assigneeId: string | null;
  teamId: string;
  departmentId: string;

  // Escalation & Metrics
  escalationLevel: 1 | 2 | 3; // 1: Team, 2: Dept, 3: External
  createdAt: string; // ISO Date
  updatedAt: string;
  resolvedAt?: string;

  // Metadata for filtering
  region: string;
  tags: string[];
}

export interface IncidentFilters {
  status: Status[];
  severity: Severity[];
  assigneeId: string | null;
  teamId: string | null;
  region: string | null;
  dateRange: {
    start: string;
    end: string;
  };
  searchTerm: string;
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
