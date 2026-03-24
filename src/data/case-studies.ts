export interface CaseStudy {
    meta: string;
    title: string;
    sections: CaseStudySection[];
  }
  
  export type CaseStudySection =
    | { heading: string; content: string }
    | { heading: string; type: "metrics"; metrics: { num: string; label: string }[] }
    | { heading: string; type: "timeline"; items: { phase: string; desc: string }[] }
    | { heading: string; tags: string[] };
  
  export const caseStudies: CaseStudy[] = [
    {
      meta: "Security & Compliance · Zenledger · 2025",
      title: "SOC2 & ISO Compliance Automation Framework",
      sections: [
        {
          heading: "The Challenge",
          content: "<p>Zenledger needed SOC2 Type II and ISO 27001 certifications. The existing infrastructure had grown without formal compliance controls — scattered access policies, inconsistent audit logging, and manual secrets rotation.</p><p>Timeline: certification within two quarters while shipping features.</p>",
        },
        {
          heading: "Key Metrics",
          type: "metrics",
          metrics: [
            { num: "0", label: "Critical findings" },
            { num: "2", label: "Quarters to certify" },
            { num: "47", label: "Controls automated" },
          ],
        },
        {
          heading: "Approach",
          type: "timeline",
          items: [
            { phase: "Discovery & Gap Analysis", desc: "Audited against SOC2 Trust Service Criteria and ISO 27001 Annex A. Mapped 47 controls, identified 23 gaps." },
            { phase: "Infrastructure Hardening", desc: "<strong>Kyverno admission policies</strong> for Kubernetes. <strong>HashiCorp Vault</strong> for centralized secrets with rotation." },
            { phase: "Continuous Compliance Pipeline", desc: "Automated scanning with <strong>Trivy, AWS Inspector, Checkov</strong>. Terraform validated against CIS benchmarks." },
            { phase: "Audit Logging", desc: "Centralized via <strong>CloudWatch Logs + Athena</strong> with 365-day retention. Real-time alerting." },
            { phase: "Certification", desc: "Documentation from IaC. Both SOC2 Type II and ISO 27001 with <strong>zero critical findings</strong>." },
          ],
        },
        { heading: "Technical Stack", tags: ["Kyverno", "Vault", "Trivy", "AWS Inspector", "Checkov", "Terraform", "CloudWatch", "Athena", "AWS Config"] },
        { heading: "Outcome", content: "<p>Compliance became <strong>continuous and automated</strong>. Audit prep time reduced by ~80%.</p>" },
      ],
    },
    {
      meta: "Blockchain Infrastructure · Freelance · 2024–2026",
      title: "High-Availability EVM Node Infrastructure on EKS",
      sections: [
        { heading: "The Challenge", content: "<p>Blockchain apps demand exceptional reliability and low-latency RPC access. Validators need near-perfect uptime to avoid slashing.</p>" },
        { heading: "Key Metrics", type: "metrics", metrics: [{ num: "<1s", label: "RPC latency" }, { num: "99.99%", label: "Uptime" }, { num: "3", label: "Availability zones" }] },
        {
          heading: "Architecture",
          type: "timeline",
          items: [
            { phase: "Multi-AZ EKS", desc: "EKS across <strong>3 AZs</strong> with dedicated node groups and topology spread constraints." },
            { phase: "Networking", desc: "<strong>AWS NLB</strong> with cross-zone load balancing. Host networking for validators." },
            { phase: "Autoscaling", desc: "<strong>Karpenter</strong> for rapid scaling. PodDisruptionBudgets for availability." },
            { phase: "Smart Contract CI/CD", desc: "<strong>Hardhat/Foundry</strong> with static analysis, fuzz testing, gas optimization." },
            { phase: "Observability", desc: "<strong>Prometheus</strong> tracking sync height, peer count, RPC latency, attestation rates." },
          ],
        },
        { heading: "Technical Stack", tags: ["EKS", "Kubernetes", "Karpenter", "AWS NLB", "Terraform", "Hardhat", "Foundry", "Prometheus", "Grafana"] },
        { heading: "Outcome", content: "<p><strong>99.99% uptime</strong>, P99 RPC latency under 800ms. Zero critical vulnerabilities reaching production.</p>" },
      ],
    },
    {
      meta: "Multi-Cloud · Freelance · 2024",
      title: "Cross-Cloud Snowflake Marketplace Distribution",
      sections: [
        { heading: "The Challenge", content: "<p>Distribute a native app on Snowflake Marketplace executing across AWS and Azure with strict metering and security requirements.</p>" },
        { heading: "Key Metrics", type: "metrics", metrics: [{ num: "2", label: "Cloud providers" }, { num: "1", label: "Unified artifact" }, { num: "100%", label: "Metering compliance" }] },
        {
          heading: "Approach",
          type: "timeline",
          items: [
            { phase: "Container Services", desc: "Containerized app running natively within Snowflake compute." },
            { phase: "Nested CloudFormation", desc: "Modular stacks with parameter validation and cross-stack references." },
            { phase: "Cross-Cloud", desc: "Same package on <strong>AWS and Azure</strong> via Snowflake multi-cloud." },
            { phase: "Metering", desc: "Usage metering APIs. Tenant isolation and data residency compliance." },
          ],
        },
        { heading: "Technical Stack", tags: ["Snowflake", "Container Services", "CloudFormation", "AWS", "Azure", "Docker"] },
        { heading: "Outcome", content: "<p>Listed on Snowflake Marketplace. Onboarding reduced from days to minutes.</p>" },
      ],
    },
    {
      meta: "Platform Engineering · Innovatetech · 2022",
      title: "Per-PR Immutable Preview Environments",
      sections: [
        { heading: "The Challenge", content: "<p>QA bottlenecked by shared staging. Days waiting, state pollution, manual setup.</p>" },
        { heading: "Key Metrics", type: "metrics", metrics: [{ num: "Days→Min", label: "Feedback loop" }, { num: "100%", label: "Isolation" }, { num: "~$0", label: "Idle cost" }] },
        {
          heading: "Architecture",
          type: "timeline",
          items: [
            { phase: "GitOps", desc: "<strong>ArgoCD ApplicationSets</strong> watching for PR events. Full-stack per PR." },
            { phase: "Composition", desc: "<strong>Helm charts</strong> with seeded databases, Vault secrets, ingress." },
            { phase: "Lifecycle", desc: "GitHub Actions: create on open, <strong>auto-teardown on merge/close</strong>." },
            { phase: "DX", desc: "PR comments with preview URLs. Slack notifications." },
          ],
        },
        { heading: "Technical Stack", tags: ["ArgoCD", "ApplicationSets", "GitHub Actions", "Kubernetes", "Helm", "Terraform", "Vault"] },
        { heading: "Outcome", content: "<p>Feedback loops from <strong>days to minutes</strong>. Environment bugs dropped to near-zero.</p>" },
      ],
    },
    {
      meta: "MLOps · IDenTV · 2020–2021",
      title: "GPU-Sharing ML Inference Platform",
      sections: [
        { heading: "The Challenge", content: "<p>ML inference on expensive GPUs. Most models underutilized but Kubernetes allocated entire GPUs per pod.</p>" },
        { heading: "Key Metrics", type: "metrics", metrics: [{ num: "60%+", label: "Cost reduction" }, { num: "3-4x", label: "GPU utilization" }, { num: "$12K/mo", label: "Saved" }] },
        {
          heading: "Approach",
          type: "timeline",
          items: [
            { phase: "Time-Slicing", desc: "<strong>NVIDIA time-slicing</strong> on EKS — multiple pods sharing GPUs." },
            { phase: "MPS", desc: "<strong>Multi-Process Service</strong> for concurrent GPU access." },
            { phase: "Monitoring", desc: "<strong>DCGM Exporter + Prometheus</strong>. Per-pod GPU dashboards." },
            { phase: "Cost Optimization", desc: "GPU sharing + <strong>Spot Instances</strong> + predictive autoscaling." },
          ],
        },
        { heading: "Technical Stack", tags: ["Kubernetes", "NVIDIA MPS", "DCGM", "EKS", "Prometheus", "Grafana", "Spot Instances"] },
        { heading: "Outcome", content: "<p>GPU utilization from ~25% to 80%+. Saved <strong>$12K/month</strong> with sub-100ms P95.</p>" },
      ],
    },
    {
      meta: "Cloud Governance · Freelance · 2024",
      title: "AWS Multi-Account Factory with Terraform",
      sections: [
        { heading: "The Challenge", content: "<p>Scaling across AWS accounts without governance. Manual setup, drift, compliance gaps.</p>" },
        { heading: "Key Metrics", type: "metrics", metrics: [{ num: "<30m", label: "Provisioning" }, { num: "0", label: "Config drift" }, { num: "100%", label: "Baseline coverage" }] },
        {
          heading: "Approach",
          type: "timeline",
          items: [
            { phase: "Control Tower", desc: "<strong>AWS Control Tower</strong> with guardrails, SCPs, centralized logging." },
            { phase: "AFT Pipeline", desc: "<strong>Account Factory for Terraform</strong> automating account vending." },
            { phase: "IAM Guardrails", desc: "<strong>SCPs</strong> preventing dangerous actions. Least-privilege defaults." },
            { phase: "Compliance", desc: "<strong>AWS Config</strong> against CIS benchmarks. Auto-remediation via EventBridge." },
          ],
        },
        { heading: "Technical Stack", tags: ["AWS AFT", "Terraform", "Control Tower", "IAM", "SCP", "AWS Config", "EventBridge"] },
        { heading: "Outcome", content: "<p>Accounts in <strong>under 30 minutes</strong> with zero drift. Manual bottleneck eliminated.</p>" },
      ],
    },
  ];
  