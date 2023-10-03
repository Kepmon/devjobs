import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "all-jobs",
    columns: [
      { name: "logo", type: "file[]" },
      {
        name: "logoBackground",
        type: "string",
        defaultValue: "hsl(36, 87%, 49%)",
      },
      {
        name: "position",
        type: "string",
        notNull: true,
        defaultValue: "Senior Software Engineer",
      },
      {
        name: "contract",
        type: "string",
        notNull: true,
        defaultValue: "Full Time",
      },
      {
        name: "location",
        type: "string",
        notNull: true,
        defaultValue: "United Kingdom",
      },
      {
        name: "description",
        type: "text",
        defaultValue:
          "Scoot is looking for a Senior Software Engineer passionate about building approachable, innovative and user-first experiences to join our small but growing Engineering team. You will be responsible for building and maintaining front end functionality across all of Scoot’s applications, fostering a growing team of software engineers, and helping drive and maintain best software patterns and practices in our codebase.",
      },
      {
        name: "requirements",
        type: "json",
        notNull: true,
        defaultValue:
          '{\n      "content": "The ideal candidate is as passionate about solving challenges through technology. They are well-versed in building proof of concepts from scratch and taking these POCs to production and scale. The right fit will have the engineering experience to build and iterate quickly and is comfortable working with product and design to set the technical strategy and roadmap.",\n      "items": [\n        "5+ years of industry experience in a software engineering role, preferably building a SaaS product. You can demonstrate significant impact that your work has had on the product and/or the team.",\n        "Experience with scalable distributed systems, both built from scratch as well as on AWS primitives.",\n        "Extremely data-driven.",\n        "Ability to debug complex systems."\n      ]\n    }',
      },
      {
        name: "role",
        type: "json",
        defaultValue:
          '{\n      "content": "We are looking for a Senior Software Engineer to join as one of our first hires. As we iterate on our MVP, you will have the opportunity to drive the vision and own the build behind our digital experience. You’ll have the support of an experienced technical advisor, a Head of Product, and an external team to work with.",\n      "items": [\n        "This role is for someone who is excited about the early stage - you’ll be responsible for turning the platform vision into reality through smart, efficient building and testing.",\n        "Translate the product roadmap into engineering requirements and own the engineering roadmap",\n        "Work with limited resources to test and learn as efficiently as possible, while laying the framework to build a more scalable product over time.",\n        "Collaborate with product, design, and external engineering teammates as needed."\n      ]\n    }',
      },
      { name: "company", type: "string", notNull: true, defaultValue: "Scoot" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type AllJobs = InferredTypes["all-jobs"];
export type AllJobsRecord = AllJobs & XataRecord;

export type DatabaseSchema = {
  "all-jobs": AllJobsRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Monika-s-workspace-2n7qdb.eu-central-1.xata.sh/db/devjobs-app",
  enableBrowser: true
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient({ apiKey: import.meta.env.XATA_API_KEY, branch: import.meta.env.XATA_BRANCH });
  return instance;
};

const xataClient = getXataClient()
export const allJobsDb = xataClient.db['all-jobs']
