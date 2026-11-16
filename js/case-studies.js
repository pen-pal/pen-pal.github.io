// Case studies opened from the Work Projects grid (PROFILE.projects[].caseStudy is an index here).
// Only include figures that also appear on the CV.
const CASE_STUDIES = [
  {
    meta: "Security & Compliance · ZenLedger 2025–2026 · Innovatetech 2021–2024",
    title: "SOC 2 & ISO 27001 Programmes",
    sections: [
      {
        heading: "The Challenge",
        content: `<p>Both a crypto tax platform and an ed-tech product serving millions of users needed SOC 2 and ISO 27001 to sell to larger customers — while engineering kept shipping. The infrastructure had to be brought up to the controls an auditor expects without stalling delivery.</p>`
      },
      {
        type: "metrics",
        heading: "At a Glance",
        metrics: [
          { num: "2", label: "Companies" },
          { num: "100%", label: "Pipelines scanned" },
          { num: "0", label: "Legacy VPNs left" }
        ]
      },
      {
        type: "timeline",
        heading: "What I Did",
        items: [
          { phase: "Programme lead", desc: "Ran <strong>auditor and tooling selection</strong> at ZenLedger and drove SOC 2, ISO 27001 and GDPR work at Innovatetech." },
          { phase: "Zero-trust access", desc: "Replaced the legacy VPN with <strong>Cloudflare Zero Trust and Tailscale</strong>, giving identity-aware, least-privilege access to every environment." },
          { phase: "Hardened infrastructure", desc: "Locked down validator and RPC infrastructure with <strong>least-privilege IAM</strong>, security group isolation and <strong>CloudTrail</strong> audit logging." },
          { phase: "Shift-left scanning", desc: "Built <strong>SonarQube, Snyk, Trivy and Checkov</strong> into every pipeline; adopted distroless containers, ClamAV file scanning and VPC endpoints." },
          { phase: "Recovery", desc: "Designed the disaster-recovery strategy on <strong>automated AWS Backup</strong> and ran DR drills for production nodes and endpoints." }
        ]
      },
      {
        heading: "Stack",
        tags: ["Cloudflare Zero Trust", "Tailscale", "IAM", "CloudTrail", "Trivy", "Snyk", "Checkov", "SonarQube", "AWS Backup"]
      }
    ]
  },
  {
    meta: "Blockchain Infrastructure · Twine (freelance)",
    title: "High-Availability EVM Node Infrastructure on EKS",
    sections: [
      {
        heading: "The Challenge",
        content: `<p>Twine, a cross-chain Layer 2, needed EVM nodes and validators that stay up and answer RPC calls quickly, and a safe way to ship smart contracts to mainnet.</p>`
      },
      {
        type: "metrics",
        heading: "At a Glance",
        metrics: [
          { num: "<1s", label: "RPC latency" },
          { num: "99.99%", label: "Uptime" },
          { num: "L2", label: "Cross-chain network" }
        ]
      },
      {
        type: "timeline",
        heading: "What I Did",
        items: [
          { phase: "Nodes on EKS", desc: "Deployed <strong>high-availability EVM node and validator infrastructure</strong> on Amazon EKS." },
          { phase: "Contract pipelines", desc: "Automated smart-contract build and deployment with <strong>Hardhat and Foundry</strong>, with security analysis before mainnet release." }
        ]
      },
      {
        heading: "Stack",
        tags: ["Amazon EKS", "Kubernetes", "EVM", "Validators", "Hardhat", "Foundry"]
      }
    ]
  },
  {
    meta: "Databases · ZenLedger · 2025–2026",
    title: "From Timescale Cloud to Self-Hosted HA TimescaleDB",
    sections: [
      {
        heading: "The Challenge",
        content: `<p>Time-series data lived on Timescale Cloud. Bringing it in-house meant running a highly available cluster with reliable backups — and moving terabytes without a long outage.</p>`
      },
      {
        type: "metrics",
        heading: "At a Glance",
        metrics: [
          { num: "3", label: "Node HA cluster" },
          { num: "5 TB+", label: "Of backups" },
          { num: "14→15", label: "RDS upgrade, zero downtime" }
        ]
      },
      {
        type: "timeline",
        heading: "What I Did",
        items: [
          { phase: "Cluster", desc: "Built a <strong>3-node high-availability TimescaleDB cluster</strong> with Autobase." },
          { phase: "Backups", desc: "Set up <strong>pgBackRest</strong> holding 5 TB+ of backups." },
          { phase: "Migration", desc: "Moved off Timescale Cloud <strong>with minimal downtime</strong>." },
          { phase: "RDS upgrade", desc: "Separately upgraded Amazon RDS from <strong>PostgreSQL 14 to 15 with zero downtime</strong>." },
          { phase: "Upstream", desc: "Contributed back to Autobase, including <strong>configurable HAProxy failover</strong> so long-running queries survive." }
        ]
      },
      {
        heading: "Stack",
        tags: ["TimescaleDB", "PostgreSQL", "Autobase", "pgBackRest", "HAProxy", "Amazon RDS"]
      }
    ]
  },
  {
    meta: "Observability · ZenLedger · 2025–2026",
    title: "Moving Observability off Datadog",
    sections: [
      {
        heading: "The Challenge",
        content: `<p>Monitoring ran on Datadog. The goal was a self-hosted stack that covers every service end to end — metrics, front-end telemetry, session replay, errors and paging — with alerts that mean something.</p>`
      },
      {
        type: "metrics",
        heading: "At a Glance",
        metrics: [
          { num: "100%", label: "Services covered" },
          { num: "7", label: "Tools in the stack" },
          { num: "SLA", label: "Driven alerting" }
        ]
      },
      {
        type: "timeline",
        heading: "What I Did",
        items: [
          { phase: "Metrics & collection", desc: "<strong>Prometheus and Grafana</strong>, with <strong>Alloy</strong> as the collector." },
          { phase: "Front end", desc: "<strong>Faro</strong> for browser telemetry and <strong>OpenReplay</strong> for session replay." },
          { phase: "Errors & paging", desc: "<strong>GlitchTip</strong> for error tracking and <strong>PagerDuty</strong> for on-call." },
          { phase: "Alerting", desc: "Tied alert thresholds to <strong>SLA targets</strong> rather than arbitrary limits." }
        ]
      },
      {
        heading: "Stack",
        tags: ["Prometheus", "Grafana", "Alloy", "Faro", "OpenReplay", "GlitchTip", "PagerDuty"]
      }
    ]
  },
  {
    meta: "Real-time Video · Innovatetech · 2021–2024",
    title: "JMW — Jitsi Meet Multi-tenant",
    sections: [
      {
        heading: "The Challenge",
        content: `<p><a href="https://www.mysecondteacher.com/" target="_blank" rel="noopener">mySecondTeacher</a> moved classes online during COVID-19 and its live-class platform had to serve millions of users. Provisioning video bridges for peak load all day is expensive; under-provisioning drops classes.</p>`
      },
      {
        type: "metrics",
        heading: "At a Glance",
        metrics: [
          { num: "M+", label: "Users served" },
          { num: "50%", label: "Cloud spend cut" },
          { num: "6", label: "Engineers led" }
        ]
      },
      {
        type: "timeline",
        heading: "What I Did",
        items: [
          { phase: "Design", desc: "Designed and built <strong>JMW</strong>, a multi-tenancy layer on top of Jitsi Meet." },
          { phase: "Live signals", desc: "Streamed <strong>JVB and Jicofo metrics</strong> into AWS in real time." },
          { phase: "Autoscaling", desc: "Scaled out from <strong>custom AMIs</strong> on real demand instead of provisioned peak capacity." },
          { phase: "Cost", desc: "Alongside spot and reserved instances and right-sizing, helped <strong>cut cloud spend 50%</strong> across a 10+ account AWS organisation." }
        ]
      },
      {
        heading: "Stack",
        tags: ["Jitsi Meet", "JVB", "Jicofo", "AWS", "Custom AMIs", "Autoscaling", "Control Tower"]
      }
    ]
  },
  {
    meta: "MLOps / GPU · IDenTV 2020–2021 · Emergegen AI (freelance)",
    title: "GPU Sharing and Scale-to-Zero for ML Inference",
    sections: [
      {
        heading: "The Challenge",
        content: `<p>Real-time video analytics — facial identification, aerial and object detection — ran on GPUs that Kubernetes hands out one whole card per pod, so most of each card sat idle. Later, at Emergegen AI, GPU instances were burning money between jobs.</p>`
      },
      {
        type: "metrics",
        heading: "At a Glance",
        metrics: [
          { num: "60%+", label: "Per-inference cost cut" },
          { num: "3", label: "Vision model services" },
          { num: "→0", label: "GPUs when idle" }
        ]
      },
      {
        type: "timeline",
        heading: "What I Did",
        items: [
          { phase: "Share the card", desc: "Engineered <strong>GPU sharing across pods</strong> with the NVIDIA device plugin and MPS." },
          { phase: "Containerise models", desc: "Containerised ML services and shipped them with <strong>Helm charts</strong> on CircleCI and TravisCI." },
          { phase: "Air-gapped installs", desc: "Packaged a <strong>single-node k3s cluster with pre-baked models</strong> as a golden AMI and ISO for government environments." },
          { phase: "Scale to zero", desc: "At Emergegen AI, built <strong>KEDA autoscaling on RabbitMQ queue depth</strong> that scales GPU instances to zero when idle." }
        ]
      },
      {
        heading: "Stack",
        tags: ["Kubernetes", "NVIDIA device plugin", "MPS", "k3s", "Packer", "Ansible", "KEDA", "RabbitMQ", "Milvus"]
      }
    ]
  }
];
