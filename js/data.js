const PROFILE = {
  name: "Manish Khadka",
  title: "DevOps / SRE / Platform Engineer",
  location: "Kathmandu, Nepal",
  phone: "+977 984 372 9354",
  email: "ManishKhadka@protonmail.com",
  linkedin: "https://linkedin.com/in/manishkhadka",
  github: "https://github.com/pen-pal",
  githubUser: "pen-pal",
  medium: "https://palpen.medium.com",
  mediumUser: "palpen",
  certUrl: "https://www.credly.com/badges/bd435d12-affc-486b-bff6-57c50cb2dfd9",

  meta: [
    { key: "Location", val: "Kathmandu, Nepal" },
    { key: "Current", val: "Sr. DevOps @ Zenledger" },
    { key: "Specialty", val: "Kubernetes & GitOps" },
    { key: "Status", val: "Open to roles", color: "#4db89e" }
  ],

  heroTags: ["Kubernetes", "AWS", "Terraform", "GitOps", "SOC2", "FinOps"],

  marqueeItems: [
    "AWS Certified DevOps <em>Pro</em>",
    "<em>Kubernetes</em> & GitOps",
    "SOC2 & ISO Compliance",
    "Multi-Cloud Architecture",
    "<em>50%</em> Cost Reduction",
    "Blockchain & MLOps",
    "Zero-Downtime Migrations",
    "7+ Years in Production"
  ],

  skills: [
    { cat: "Cloud Platforms", items: ["AWS", "GCP", "Azure", "DigitalOcean"], hot: [0,1,2] },
    { cat: "Containers & Orchestration", items: ["Kubernetes", "Docker", "ECS", "Containerd", "Docker Swarm"], hot: [0,1] },
    { cat: "CI/CD & GitOps", items: ["ArgoCD", "GitHub Actions", "Jenkins", "GitLab CI", "CircleCI", "CodePipeline"], hot: [0,1] },
    { cat: "Infrastructure as Code", items: ["Terraform", "Ansible", "OpenTofu", "CloudFormation", "Packer"], hot: [0,1] },
    { cat: "Observability", items: ["Prometheus", "Grafana", "Loki", "ELK Stack", "Datadog", "PagerDuty"], hot: [0,1] },
    { cat: "Security & Networking", items: ["Trivy", "Vault", "Kong API GW", "Istio", "Cilium", "Cloudflare ZT", "Kyverno"], hot: [0,1] },
    { cat: "Databases", items: ["PostgreSQL", "MySQL", "Redis", "MongoDB", "TimescaleDB", "Elasticsearch", "Snowflake"] },
    { cat: "Compliance & Specialized", items: ["SOC2", "ISO", "Blockchain / EVM", "MLOps", "FinOps"], hot: [0,1] },
    { cat: "VPN & Zero Trust", items: ["Fortigate", "Wireguard", "Tailscale", "Cloudflare Zero Trust"] }
  ],

  experience: [
    {
      live: true,
      period: "Feb 2025 — Present",
      badge: "Zenledger",
      role: "Senior DevOps <em>Engineer</em>",
      company: "Zenledger · Crypto Tax Platform",
      bullets: [
        "<strong>Led SOC2 & ISO compliance</strong> to certification — hardening infrastructure, access controls, and documentation.",
        "<strong>Migrated from Cloudflare to AWS WAF</strong>, significantly reducing monthly costs while maintaining edge security.",
        "Designed a <strong>high-availability TimescaleDB cluster</strong> using Autobase for time-series data reliability.",
        "Implemented <strong>Cloudflare Zero Trust</strong>, replacing legacy VPNs with identity-aware secure access.",
        "Orchestrated <strong>zero-downtime RDS upgrades</strong> (PostgreSQL 14→15) and seamless EKS patching."
      ],
      tags: ["AWS WAF", "Cloudflare ZT", "TimescaleDB", "EKS", "SOC2/ISO"]
    },
    {
      period: "Nov 2024 — Jan 2026",
      badge: "Freelance",
      role: "Blockchain DevOps & <em>MLOps</em>",
      company: "Independent · Blockchain & ML Infrastructure",
      bullets: [
        "Deployed <strong>HA EVM nodes & Validator infrastructure</strong> on EKS with sub-second RPC latency.",
        "Engineered <strong>automated Smart Contract pipelines</strong> (Hardhat/Foundry) with integrated security analysis.",
        "Architected <strong>Snowflake Container Services</strong> for cross-cloud native app execution on Snowflake Marketplace.",
        "Deployed <strong>AWS Account Factory for Terraform</strong> for consistent multi-account governance."
      ],
      tags: ["EVM Nodes", "Hardhat", "Snowflake", "AWS AFT", "Packer"]
    },
    {
      period: "Nov 2023 — Feb 2025",
      badge: "CloudHero",
      role: "Senior DevOps <em>Engineer</em>",
      company: "CloudHero · Cloud Consulting Agency",
      bullets: [
        "Led <strong>monolith-to-microservices migration</strong> on Kubernetes with near-zero downtime for enterprise clients.",
        "Spearheaded <strong>multi-cloud migrations</strong> from on-premises to AWS, GCP, Azure, and DigitalOcean.",
        "Deployed <strong>ArgoCD + Terraform GitOps pipelines</strong> for fully auditable infrastructure management.",
        "Automated migration of <strong>thousands of ingress resources</strong> to Kong API Gateway."
      ],
      tags: ["Kubernetes", "ArgoCD", "Kong", "Multi-Cloud", "Terraform"]
    },
    {
      period: "Jul 2021 — Feb 2024",
      badge: "Innovatetech",
      role: "DevOps <em>Team Lead</em>",
      company: "Innovatetech Pvt. Ltd.",
      bullets: [
        "Achieved <strong>50% AWS cost reduction</strong> across five accounts via spot/reserved instances and lifecycle automation.",
        "Built <strong>security pipelines</strong> with SonarQube, Trivy & Checkov; adopted distroless containers.",
        "Introduced <strong>per-PR immutable preview environments</strong>, dramatically accelerating QA cycles.",
        "<strong>Managed a team of 5 engineers</strong>, mentoring on IaC and cloud best practices."
      ],
      tags: ["Cost Optimization", "SonarQube", "Trivy", "GitOps", "Team Lead"]
    },
    {
      period: "Feb 2020 — Jul 2021",
      badge: "IDenTV",
      role: "DevOps <em>Engineer</em>",
      company: "IDenTV · Video Intelligence Platform",
      bullets: [
        "Reduced <strong>monthly AWS spend from $24K to $12K</strong> (50%) through targeted optimizations.",
        "Automated EKS, ECS, RDS & Elasticache across <strong>AWS and Oracle Cloud</strong> via Terraform.",
        "Implemented <strong>GPU sharing across Kubernetes pods</strong>, maximizing utilization for ML workloads."
      ],
      tags: ["Cost Reduction", "Terraform", "GPU Sharing", "Vault"]
    }
  ],

  projects: [
    {
      num: "01",
      title: "SOC2 Compliance <em>Automation</em> Framework",
      desc: "End-to-end SOC2 & ISO compliance infrastructure controls covering access control, audit logging, secrets management, and continuous monitoring — delivering certification with minimal engineering overhead.",
      impact: "Successful SOC2 and ISO certifications with zero critical findings during audits",
      tags: ["Kyverno", "Vault", "Trivy", "Terraform", "CloudWatch"],
      cat: "Security & Compliance",
      caseStudy: 0
    },
    {
      num: "02",
      title: "High-Availability <em>EVM Node</em> Infrastructure",
      desc: "Production-grade EVM node clusters and Validator infrastructure on Amazon EKS. Sub-second RPC latency through optimized networking, load balancing, and autoscaling for distributed ledger operations at scale.",
      impact: "Sub-second RPC latency with 99.99% uptime for distributed ledger operations",
      tags: ["EKS", "Kubernetes", "Terraform", "Hardhat", "Foundry"],
      cat: "Blockchain Infrastructure",
      caseStudy: 1
    },
    {
      num: "03",
      title: "Cross-Cloud <em>Snowflake</em> Marketplace Distribution",
      desc: "Nested CloudFormation templates for SaaS distribution leveraging Snowflake Container Services to publish native applications on the Snowflake Marketplace, enabling execution across AWS and Azure from a single artifact.",
      impact: "Cross-cloud native app distribution meeting strict metering and compliance requirements",
      tags: ["Snowflake", "CloudFormation", "AWS", "Azure", "Docker"],
      cat: "Multi-Cloud / Data",
      caseStudy: 2
    },
    {
      num: "04",
      title: "Per-PR <em>Immutable Preview</em> Environments",
      desc: "GitOps-driven system spinning up fully isolated preview environments for every pull request — with seeded databases, secrets injection, and auto-teardown. Reduced feedback loops from days to minutes.",
      impact: "Reduced deployment feedback loops from days to minutes with full environment isolation",
      tags: ["ArgoCD", "GitHub Actions", "Kubernetes", "Helm", "Terraform"],
      cat: "Platform Engineering",
      caseStudy: 3
    },
    {
      num: "05",
      title: "GPU-Sharing <em>ML Inference</em> Platform",
      desc: "Production Kubernetes platform enabling GPU sharing across multiple pods for ML inference workloads. Time-slicing and MPS to maximize GPU utilization, cutting per-inference infrastructure costs by over 60%.",
      impact: "Over 60% reduction in per-inference infrastructure costs through GPU time-slicing",
      tags: ["Kubernetes", "NVIDIA MPS", "EKS", "Prometheus", "Grafana"],
      cat: "MLOps / GPU Infrastructure",
      caseStudy: 4
    },
    {
      num: "06",
      title: "AWS Multi-Account <em>Factory</em> with Terraform",
      desc: "AWS Account Factory for Terraform (AFT) automating account vending across the org. Consistent security baselines, IAM guardrails, and compliance controls at the account level — eliminating configuration drift.",
      impact: "Automated provisioning of new accounts with consistent security baselines in under 30 minutes",
      tags: ["AWS AFT", "Terraform", "Control Tower", "IAM", "SCP"],
      cat: "Cloud Governance",
      caseStudy: 5
    }
  ],

  contact: [
    { label: "Email", val: "ManishKhadka@protonmail.com", href: "mailto:ManishKhadka@protonmail.com" },
    { label: "Phone", val: "+977 984 372 9354", href: "tel:+9779843729354" },
    { label: "LinkedIn", val: "linkedin.com/in/manishkhadka", href: "https://linkedin.com/in/manishkhadka" },
    { label: "GitHub", val: "github.com/pen-pal", href: "https://github.com/pen-pal" },
    { label: "Medium", val: "palpen.medium.com", href: "https://palpen.medium.com" }
  ],

  skillsResume: [
    { name: "Kubernetes & EKS", pct: 95 },
    { name: "Terraform / IaC", pct: 92 },
    { name: "AWS", pct: 95 },
    { name: "CI/CD & GitOps", pct: 90 },
    { name: "Security & Compliance", pct: 85 },
    { name: "GCP / Azure", pct: 80 }
  ],

  languages: [
    { lang: "Nepali", level: "Native" },
    { lang: "English", level: "Professional" },
    { lang: "Hindi", level: "Conversational" }
  ],

  education: [
    { degree: "Master of Arts in Psychology", school: "Tri-Chandra Multiple Campus, Kathmandu · 2023 — Present" },
    { degree: "B.Eng. Electrical & Electronics Engineering", school: "Kathmandu University · 2012 — 2016" }
  ],

  certifications: [
    { name: "AWS Certified DevOps Engineer — Professional", url: "https://www.credly.com/badges/bd435d12-affc-486b-bff6-57c50cb2dfd9" }
  ],

  resumeExp: [
    {
      role: "Senior DevOps Engineer",
      dates: "Feb 2025 — Present",
      company: "Zenledger · Crypto Tax Platform",
      bullets: [
        "<strong>Led SOC2 & ISO compliance</strong> to certification.",
        "<strong>Migrated from Cloudflare to AWS WAF</strong>, reducing monthly costs.",
        "Designed <strong>HA TimescaleDB cluster</strong> using Autobase.",
        "Implemented <strong>Cloudflare Zero Trust</strong> replacing legacy VPNs.",
        "Orchestrated <strong>zero-downtime RDS upgrades</strong> (PostgreSQL 14→15) and EKS patching."
      ]
    },
    {
      role: "Blockchain DevOps & MLOps Engineer",
      dates: "Nov 2024 — Jan 2026",
      company: "Freelance · Blockchain & ML Infrastructure",
      bullets: [
        "Deployed <strong>HA EVM nodes & Validator infrastructure</strong> on EKS with sub-second RPC latency.",
        "Engineered <strong>automated Smart Contract pipelines</strong> (Hardhat/Foundry) with security analysis.",
        "Architected <strong>Snowflake Container Services</strong> for cross-cloud distribution on Snowflake Marketplace.",
        "Deployed <strong>AWS Account Factory for Terraform (AFT)</strong> for multi-account governance."
      ]
    },
    {
      role: "Senior DevOps Engineer",
      dates: "Nov 2023 — Feb 2025",
      company: "CloudHero · Cloud Consulting Agency",
      bullets: [
        "Led <strong>monolith-to-microservices migrations</strong> on Kubernetes with near-zero downtime.",
        "Multi-cloud migrations to <strong>AWS, GCP, Azure, DigitalOcean</strong> using ECS and EKS.",
        "Deployed <strong>ArgoCD + Terraform GitOps pipelines</strong> for auditable infrastructure management.",
        "Automated migration of thousands of ingress resources to <strong>Kong API Gateway</strong>."
      ]
    },
    {
      role: "DevOps Team Lead",
      dates: "Jul 2021 — Feb 2024",
      company: "Innovatetech Pvt. Ltd.",
      bullets: [
        "<strong>50% AWS cost reduction</strong> across five accounts via spot/reserved instances and lifecycle automation.",
        "Built <strong>security pipelines</strong> with SonarQube, Trivy, Checkov; adopted distroless containers.",
        "Introduced <strong>per-PR immutable preview environments</strong>, accelerating QA cycles.",
        "<strong>Managed team of 5 DevOps engineers</strong>, mentoring on IaC and cloud best practices."
      ]
    },
    {
      role: "DevOps Engineer",
      dates: "Feb 2020 — Jul 2021",
      company: "IDenTV · Video Intelligence Platform",
      bullets: [
        "Reduced <strong>AWS spend from $24K to $12K/mo</strong> (50%) through targeted optimizations.",
        "Automated infra across <strong>AWS and Oracle Cloud</strong> via Terraform — setup by 70%.",
        "Implemented <strong>GPU sharing across Kubernetes pods</strong> for ML inference workloads."
      ]
    }
  ]
};

