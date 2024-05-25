// import { sequelize } from "./dbSequelizeConnection.js";
import { DataTypes, Sequelize } from "sequelize";
// Define the Learning model

export const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_SERVER_IP,
    dialect: "mssql",
  }
);

export const CourtList = sequelize.define(
  "CourtList",
  {
    CourtId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CourtName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "CourtList", // Explicitly specify the table name
    timestamps: false, // Disable createdAt and updatedAt timestamps
  }
);

export const JurisdictionList = sequelize.define(
  "JurisdictionList",
  {
    JurisdictionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    JurisdictionName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdDate: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("GETDATE()"),
    },
  },
  {
    tableName: "JurisdictionList", // Explicitly specify the table name
    timestamps: false, // Disable createdAt and updatedAt timestamps
  }
);

export const State = sequelize.define(
  "State",
  {
    StateId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    State: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdDate: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("GETDATE()"),
    },
  },
  {
    tableName: "State", // Explicitly specify the table name
    timestamps: false, // Disable createdAt and updatedAt timestamps
  }
);

export const District = sequelize.define(
  "District",
  {
    DistrictId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    District: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    StateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdDate: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("GETDATE()"),
    },
  },
  {
    tableName: "District", // Explicitly specify the table name
    timestamps: false, // Disable createdAt and updatedAt timestamps
  }
);

export const City = sequelize.define(
  "City",
  {
    CityId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    City: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DistrictId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdDate: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("GETDATE()"),
    },
  },
  {
    tableName: "City", // Explicitly specify the table name
    timestamps: false, // Disable createdAt and updatedAt timestamps
  }
);

export const Taluk = sequelize.define(
  "Taluk",
  {
    TalukId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Taluk: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdDate: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("GETDATE()"),
    },
  },
  {
    tableName: "Taluk", // Explicitly specify the table name
    timestamps: false, // Disable createdAt and updatedAt timestamps
  }
);

export const Village = sequelize.define(
  "Village",
  {
    VillageId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Village: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TalukId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdDate: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("GETDATE()"),
    },
  },
  {
    tableName: "Village", // Explicitly specify the table name
    timestamps: false, // Disable createdAt and updatedAt timestamps
  }
);

export const UserDetails = sequelize.define(
  "UserDetails",
  {
    UserId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    HashPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdDate: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("GETDATE()"),
    },
  },
  {
    tableName: "UserDetails", // Explicitly specify the table name
    timestamps: false, // Disable createdAt and updatedAt timestamps
  }
);

export const DocumentStorageLink = sequelize.define(
  "DocumentStorageLink",
  {
    documentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    caseId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    schoolRecordsPdf: DataTypes.STRING,
    courtOrdersPdf: DataTypes.STRING,
    judgementsPdf: DataTypes.STRING,
    witnessStatementsPdf: DataTypes.STRING,
    photographsPdf: DataTypes.STRING,
    testimonyPdf: DataTypes.STRING,
    policeReportsPdf: DataTypes.STRING,
    medicalReportsPdf: DataTypes.STRING,
    protectionOrderPdf: DataTypes.STRING,
    placementOrderPdf: DataTypes.STRING,
    restrainingOrderPdf: DataTypes.STRING,
  },
  {
    tableName: "DocumentStorageLink", // Explicitly specify the table name
    timestamps: false, // Disable createdAt and updatedAt timestamps
  }
);

export const CaseDetails = sequelize.define(
  "CaseDetails",
  {
    caseId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    childName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    guradian: DataTypes.STRING,
    educationalBg: DataTypes.TEXT,
    address: DataTypes.TEXT,
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    city: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    taluk: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    village: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    caseIdInput: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caseTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caseDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    courtName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jurisdiction: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caseType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    casePriority: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caseStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lawyer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    petitioner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    respondent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    legalAidDetails: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caseTimeline: DataTypes.DATEONLY,
    nextHearingDate: DataTypes.DATEONLY,
    nextStepsandAction: DataTypes.TEXT,
    taskAssignment: DataTypes.TEXT,
    caseNotesandUpdatesInput: DataTypes.TEXT,
    postCaseMonitoringInput: DataTypes.TEXT,
    followUpActionInput: DataTypes.TEXT,
    createdDate: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("GETDATE()"),
    },
  },
  {
    tableName: "CaseDetails", // Explicitly specify the table name
    timestamps: false, // Disable createdAt and updatedAt timestamps
  }
);
