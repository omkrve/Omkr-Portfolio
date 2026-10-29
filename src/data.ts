// Edit everything about the site here. Components read from this file only.

export const profile = {
  name: "Omkar",
  role: "Cloud Engineer and Visual Designer",
  availability: "Available to work",
  intro:
    "I own the whole thing: the AWS infrastructure and pipeline underneath, and the identity and visuals on top.",
  email: "omkrkirve@gmail.com", // TODO: your real email
  resumeFile: "/resume.pdf", // put your PDF at public/resume.pdf
  resumeDownloadName: "Omkr-Resume.pdf",
  photo: "/profile.png", 

  socials: [
    { label: "GitHub", href: "https://github.com/omkrve" }, // TODO
    { label: "LinkedIn", href: "https://www.linkedin.com/in/omkrkirve" }, // TODO
    { label: "Instagram", href: "" }, // leave empty to hide
    { label: "Behance", href: "" }, // leave empty to hide
  ],
};

export const greetings = [
  { text: "नमस्ते", lang: "hi" },
  { text: "Hello", lang: "en" },
  { text: "こんにちは", lang: "ja" },
  { text: "Ciao", lang: "it" },
  { text: "Hola", lang: "es" },
];

export type CloudProject = {
  title: string;
  summary: string;
  stack: string[];
  /** Services shown in the animated architecture sketch, in order. */
  flow: string[];
  year: string;
  status?: string;
  github: string;
};

export const cloudProjects: CloudProject[] = [
  {
    title: "CloudMonitor Pro",
    summary:
      "A dashboard that watches EC2, S3, RDS and Lambda through CloudWatch, with SNS alerts. The capstone moves it onto Terraform and a GitHub Actions pipeline.",
    stack: ["Flask", "boto3", "CloudWatch", "SNS", "Terraform", "GitHub Actions"],
    flow: ["GitHub Actions", "Terraform", "EC2", "CloudWatch", "SNS"],
    year: "2026",
    status: "Capstone",
    github: "https://github.com/omkrve/CloudMonitor-Pro", // TODO
  },
  {
    title: "AgriSakha",
    summary:
      "A multilingual web app that predicts crop disease from a leaf photo, built for farmers. Inference runs in a containerised Lambda to stay inside the free tier.",
    stack: ["React", "API Gateway", "Lambda", "S3", "DynamoDB", "Terraform"],
    flow: ["React", "API Gateway", "Lambda", "S3", "DynamoDB"],
    year: "2026",
    status: "In progress",
    github: "https://github.com/omkrve/AgriSakha", // TODO
  },
  {
    title: "QueueLess",
    summary:
      "A virtual queue app: join from your phone, get called when it is your turn. Flask and SQLite behind a dark violet design system.",
    stack: ["Flask", "SQLite", "Design system"],
    flow: ["Phone", "Flask", "SQLite"],
    year: "2026",
    github: "https://github.com/omkrve/Queueless", // TODO
  },
  {
    title: "Cloud-Serve",
    summary:
      "CloudServe is a cloud-native application deployment project that automates the build, containerization, and deployment process using Jenkins, Docker, Amazon ECR, and Kubernetes (K3s) on AWS EC2. It integrates GitHub with Jenkins for CI/CD automation and uses Kubernetes Deployments, NodePort Services, and Persistent Volumes to enable reliable application deployment, service access, and data persistence.",
   stack: ["Flask", "Docker", "Jenkins", "Kubernetes (K3s)", "Amazon ECR", "AWS EC2"],
   flow: ["GitHub", "Jenkins", "Docker", "Amazon ECR", "Kubernetes (K3s)", "AWS EC2"],
    year: "2026",
    status: "Capstone",
    github: "https://github.com/omkrve/cloudserve2", // TODO
  },
];

export type DesignProject = {
  slug: string;
  title: string;
  discipline: string;
  summary: string;
  /** File shown when the card is opened. Put it in public/work/. Image or PDF. */
  file: string;
  kind: "image" | "pdf";
  /** Placeholder cover until your real file is in place. */
  art: "gold" | "wash" | "juice" | "gem";
  /** Optional, shown in the detail view when present. */
  year?: string;
  tools?: string[];
};

export const designProjects: DesignProject[] = [
  {
    slug: "swarnsootra",
    title: "Swarnsootra Jewels",
    discipline: "Branding and social visuals",
    summary: "Brand visuals and marketing content for a jewellery label.",
    file: "/work/swarnsootra.png",
    kind: "image",
    art: "gold",
  },
  {
    slug: "andes",
    title: "Andes",
    discipline: "Branding and marketing",
    summary: "Identity and marketing design for a laundry service.",
    file: "/work/andes.png",
    kind: "image",
    art: "wash",
  },
  {
    slug: "devraee",
    title: "Devraee",
    discipline: "Branding and visual content",
    summary: "Brand and content design for a pickle brand.",
    file: "/work/devraee.png",
    kind: "image",
    art: "juice",
  },
  {
    slug: "gemone",
    title: "Gemone Halloween",
    discipline: "Campaign visuals",
    summary: "Ring visuals for a lab-grown diamond jewellery Halloween campaign.",
    file: "/work/gemone.jpeg",
    kind: "image",
    art: "gem",
  },
];

export const marquee = {
  cloud: ["EC2", "S3", "RDS", "Lambda", "DynamoDB", "API Gateway", "CloudWatch", "SNS", "Terraform", "GitHub Actions"],
  design: ["Brand identity", "Campaign visuals", "Jewellery art direction", "Social content", "AI image direction", "Packaging"],
};

export const about = {
  statement:
    "I'm in the final year of a cloud computing degree, aiming for AWS, DevOps and infrastructure-as-code roles. Next to that I run a small design practice for jewellery, laundry and juice brands. Both jobs come down to the same thing: making a system clear enough that nobody has to ask how it works.",
  cloud: ["EC2", "S3", "RDS", "Lambda", "DynamoDB", "API Gateway", "CloudWatch", "SNS", "Terraform", "GitHub Actions"],
  design: ["Brand identity", "Social and campaign visuals", "Jewellery visuals", "AI image direction"],
};
