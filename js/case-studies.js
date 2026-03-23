const CASE_STUDIES = [
  {
    meta: "Security & Compliance · Zenledger · 2025",
    title: "SOC2 & ISO Compliance Automation Framework",
    sections: [
      {
        heading: "The Challenge",
        content: `<p>Zenledger, a rapidly growing crypto tax platform, needed SOC2 Type II and ISO 27001 certifications to serve enterprise clients. The existing infrastructure had grown organically without formal compliance controls — scattered access policies, inconsistent audit logging, and manual secrets rotation created significant gaps.</p><p>The timeline was aggressive: certification within two quarters while the engineering team continued shipping product features.</p>`
      },
      {
        type: "metrics",
        heading: "Key Metrics",
        metrics: [
          { num: "0", label: "Critical findings" },
          { num: "2", label: "Quarters to certify" },
          { num: "47", label: "Controls automated" }
        ]
      },
      {
        type: "timeline",
        heading: "Approach",
        items: [
          { phase: "Discovery & Gap Analysis", desc: "Audited existing infrastructure against SOC2 Trust Service Criteria and ISO 27001 Annex A. Mapped 47 required controls to existing tooling, identifying 23 gaps." },
          { phase: "Infrastructure Hardening", desc: "Implemented <strong>Kyverno admission policies</strong> for Kubernetes, enforcing pod security standards. Deployed <strong>HashiCorp Vault</strong> for centralized secrets management with automatic rotation." },
          { phase: "Continuous Compliance Pipeline", desc: "Built automated scanning with <strong>Trivy, AWS Inspector, and Checkov</strong> on every infrastructure change. Terraform plans validated against CIS benchmarks before apply." },
          { phase: "Audit Logging & Monitoring", desc: "Centralized audit trails via <strong>CloudWatch Logs + Athena</strong> with 365-day retention. Real-time alerting for policy violations and configuration drift." },
          { phase: "Certification", desc: "Generated compliance documentation from infrastructure-as-code. Both SOC2 Type II and ISO 27001 achieved with <strong>zero critical findings</strong>." }
        ]
      },
      {
        heading: "Technical Stack",
        tags: ["Kyverno", "HashiCorp Vault", "Trivy", "AWS Inspector", "Checkov", "Terraform", "CloudWatch", "Athena", "AWS Config"]
      },
      {
        heading: "Outcome",
        content: `<p>The framework transformed compliance from a periodic scramble into a <strong>continuous, automated process</strong>. New infrastructure changes are validated against compliance requirements before deployment, reducing audit preparation time by an estimated 80%.</p>`
      }
    ]
  },
  {
    meta: "Blockchain Infrastructure · Freelance · 2024–2026",
    title: "High-Availability EVM Node Infrastructure on EKS",
    sections: [
      {
        heading: "The Challenge",
        content: `<p>Blockchain applications demand exceptional reliability and low-latency RPC access. Validator nodes must maintain near-perfect uptime to avoid slashing penalties, while RPC endpoints need sub-second response times under variable load.</p>`
      },
      {
        type: "metrics",
        heading: "Key Metrics",
        metrics: [
          { num: "<1s", label: "RPC latency" },
          { num: "99.99%", label: "Uptime achieved" },
          { num: "3", label: "Availability zones" }
        ]
      },
      {
        type: "timeline",
        heading: "Architecture",
        items: [
          { phase: "Multi-AZ EKS Cluster", desc: "Deployed EKS across <strong>3 availability zones</strong> with dedicated node groups. Topology spread constraints ensure even distribution." },
          { phase: "Optimized Networking", desc: "<strong>AWS NLB with cross-zone load balancing</strong> for RPC traffic. Host networking for validator pods to minimize latency." },
          { phase: "Autoscaling & Resilience", desc: "Custom <strong>Karpenter provisioners</strong> for rapid scaling. PodDisruptionBudgets ensure minimum validator availability." },
          { phase: "Smart Contract CI/CD", desc: "Automated pipelines using <strong>Hardhat and Foundry</strong> with static analysis, fuzz testing, and gas optimization before mainnet." },
          { phase: "Observability", desc: "<strong>Prometheus + custom exporters</strong> tracking block sync height, peer count, RPC latency percentiles, and attestation rates." }
        ]
      },
      {
        heading: "Technical Stack",
        tags: ["Amazon EKS", "Kubernetes", "Karpenter", "AWS NLB", "Terraform", "Hardhat", "Foundry", "Prometheus", "Grafana"]
      },
      {
        heading: "Outcome",
        content: `<p>The infrastructure has maintained <strong>99.99% uptime</strong> with P99 RPC latency under 800ms. The automated pipeline has caught multiple vulnerabilities before mainnet, with zero critical issues reaching production.</p>`
      }
    ]
  },
  {
    meta: "Multi-Cloud / Data · Freelance · 2024",
    title: "Cross-Cloud Snowflake Marketplace Distribution",
    sections: [
      {
        heading: "The Challenge",
        content: `<p>The client needed to distribute a native application on the Snowflake Marketplace executing across both AWS and Azure — while meeting Snowflake's strict requirements for metering, security boundaries, and automated provisioning.</p>`
      },
      {
        type: "metrics",
        heading: "Key Metrics",
        metrics: [
          { num: "2", label: "Cloud providers" },
          { num: "1", label: "Unified artifact" },
          { num: "100%", label: "Metering compliance" }
        ]
      },
      {
        type: "timeline",
        heading: "Approach",
        items: [
          { phase: "Snowflake Container Services", desc: "Built a containerized application running natively within Snowflake compute, meeting all Marketplace listing requirements." },
          { phase: "Nested CloudFormation", desc: "Modular, nested stacks with parameter validation, cross-stack references, and conditional resource creation." },
          { phase: "Cross-Cloud Execution", desc: "Abstraction layers enabling the same package to execute on both <strong>AWS and Azure</strong> through Snowflake's multi-cloud capabilities." },
          { phase: "Compliance & Metering", desc: "Integrated Snowflake's usage metering APIs. Implemented tenant isolation and data residency compliance." }
        ]
      },
      {
        heading: "Technical Stack",
        tags: ["Snowflake", "Container Services", "CloudFormation", "AWS", "Azure", "Docker"]
      },
      {
        heading: "Outcome",
        content: `<p>Successfully listed on the Snowflake Marketplace with full cross-cloud support. Automated provisioning reduced customer onboarding from days to minutes.</p>`
      }
    ]
  },
  {
    meta: "Platform Engineering · Innovatetech · 2022",
    title: "Per-PR Immutable Preview Environments",
    sections: [
      {
        heading: "The Challenge",
        content: `<p>QA cycles were bottlenecked by shared staging environments. Developers waited days for access, environments accumulated state pollution, and reproducing bugs required manual setup.</p>`
      },
      {
        type: "metrics",
        heading: "Key Metrics",
        metrics: [
          { num: "Days→Min", label: "Feedback loop" },
          { num: "100%", label: "Environment isolation" },
          { num: "~$0", label: "Idle cost" }
        ]
      },
      {
        type: "timeline",
        heading: "Architecture",
        items: [
          { phase: "GitOps Foundation", desc: "<strong>ArgoCD ApplicationSets</strong> watching for PR events. Each PR triggers a namespaced Kubernetes environment with full stack." },
          { phase: "Environment Composition", desc: "<strong>Helm charts</strong> parameterized per PR with seeded databases, Vault secrets, and ingress routing." },
          { phase: "Automated Lifecycle", desc: "GitHub Actions handle creation on PR open, updates on push, and <strong>automatic teardown on merge/close</strong>." },
          { phase: "Developer Experience", desc: "PR comments include preview URLs, environment status, and teardown commands. Slack notifications when ready." }
        ]
      },
      {
        heading: "Technical Stack",
        tags: ["ArgoCD", "ApplicationSets", "GitHub Actions", "Kubernetes", "Helm", "Terraform", "Vault"]
      },
      {
        heading: "Outcome",
        content: `<p>Feedback loops compressed from <strong>days to minutes</strong>. QA tested against clean environments for every change. Environment-related bugs dropped to near-zero.</p>`
      }
    ]
  },
  {
    meta: "MLOps · IDenTV · 2020–2021",
    title: "GPU-Sharing ML Inference Platform",
    sections: [
      {
        heading: "The Challenge",
        content: `<p>IDenTV's video intelligence platform ran ML inference on expensive GPU instances. Most models didn't fully utilize GPU capacity, but Kubernetes allocated entire GPUs to single pods — significant waste and inflated bills.</p>`
      },
      {
        type: "metrics",
        heading: "Key Metrics",
        metrics: [
          { num: "60%+", label: "Cost reduction" },
          { num: "3-4x", label: "GPU utilization" },
          { num: "$12K/mo", label: "Saved" }
        ]
      },
      {
        type: "timeline",
        heading: "Approach",
        items: [
          { phase: "GPU Time-Slicing", desc: "Enabled <strong>NVIDIA GPU time-slicing</strong> on EKS, allowing multiple pods to share physical GPUs." },
          { phase: "MPS Integration", desc: "<strong>NVIDIA Multi-Process Service (MPS)</strong> for concurrent GPU access with better throughput." },
          { phase: "Monitoring", desc: "<strong>DCGM Exporter + Prometheus</strong> for GPU utilization metrics. Grafana dashboards for per-pod tracking." },
          { phase: "Cost Optimization", desc: "Combined GPU sharing with <strong>Spot Instances</strong> and predictive autoscaling based on queue depth." }
        ]
      },
      {
        heading: "Technical Stack",
        tags: ["Kubernetes", "NVIDIA MPS", "DCGM", "EKS", "Prometheus", "Grafana", "Spot Instances"]
      },
      {
        heading: "Outcome",
        content: `<p>GPU utilization increased from ~25% to over 80%. Per-inference costs dropped by 60%+, saving <strong>$12K/month</strong> while maintaining sub-100ms P95 latency.</p>`
      }
    ]
  },
  {
    meta: "Cloud Governance · Freelance · 2024",
    title: "AWS Multi-Account Factory with Terraform",
    sections: [
      {
        heading: "The Challenge",
        content: `<p>The organization was scaling across multiple AWS accounts without consistent governance. Each new account required manual setup — leading to configuration drift and compliance gaps.</p>`
      },
      {
        type: "metrics",
        heading: "Key Metrics",
        metrics: [
          { num: "<30m", label: "Account provisioning" },
          { num: "0", label: "Config drift" },
          { num: "100%", label: "Baseline coverage" }
        ]
      },
      {
        type: "timeline",
        heading: "Approach",
        items: [
          { phase: "Control Tower", desc: "<strong>AWS Control Tower</strong> with custom guardrails, mandatory SCPs, and centralized logging." },
          { phase: "AFT Pipeline", desc: "<strong>Account Factory for Terraform</strong> automating account vending with standardized baselines." },
          { phase: "IAM Guardrails", desc: "<strong>SCPs</strong> preventing dangerous actions. Automated IAM provisioning with least-privilege defaults." },
          { phase: "Continuous Compliance", desc: "<strong>AWS Config rules</strong> continuously evaluate against CIS benchmarks. Drift triggers auto-remediation." }
        ]
      },
      {
        heading: "Technical Stack",
        tags: ["AWS AFT", "Terraform", "Control Tower", "IAM", "SCP", "AWS Config", "EventBridge"]
      },
      {
        heading: "Outcome",
        content: `<p>New accounts provisioned in under 30 minutes with <strong>zero configuration drift</strong>. Security baselines enforced automatically. Eliminated the manual setup bottleneck entirely.</p>`
      }
    ]
  }
];

