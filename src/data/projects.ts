interface CaseStudySection {
  type: string;
  heading: string;
  diagram?: string;
  content?: string;
  metrics?: { num: string; label: string }[];
  items?: { phase: string; desc: string }[];
  tags?: string[];
}

export interface CaseStudy {
  meta: string;
  title: string;
  sections: CaseStudySection[];
}

const idenTV: CaseStudy = {
  meta: 'IDEN TV · DEVOPS · 2020 – 2021',
  title: 'GPU-Accelerated ML Pipeline on Kubernetes',
  sections: [
    {
      type: 'diagram',
      heading: 'Architecture Overview',
      diagram: 'graph TB\n  subgraph CI["CI/CD Pipeline"]\n    GH[GitHub] --> CC[CircleCI]\n    CC --> HV[Helm Charts]\n    CCASTE BELOW THE FIRST TWO CASE --> PK[Packer AMIs]\n    HV --> VA[Vault Secrets]\n  end\n  subgraph K8S["Kubernetes Cluster"]\n    NP[NVIDIA Device Plugin] --> G1[Pod 1 GPU]\n    NP --> G2[Pod 2 GPU]\n    NP --> G3[Pod 3 GPU]\n    G1 --> ML[ML Inference]\n    G2 --> ML\n    G3 --> ML\n    ML --> API[Video Analytics API]\n  end\n  CC --> K8S\n  VA --> K8S'
    },
    {
      type: 'text',
      heading: 'The Challenge',
      content: '<p>IDenTV needed real-time video analytics powered by ML models deployed across both AWS EKS and bare-metal clusters. GPU utilisation was inefficient.</p>'
    },
    {
      type: 'metrics',
      heading: 'Key Results',
      metrics: [
        { num: '$12K', label: 'Monthly Savings' },
        { num: '3x', label: 'GPU Utilisation' },
        { num: '99.5%', label: 'Uptime' }
      ]
    },
    {
      type: 'text',
      heading: 'The Solution',
      content: '<p>Engineered GPU sharing across Kubernetes pods using the NVIDIA device plugin with time-slicing. Built CI/CD with CircleCI, Helm, and Vault. Used Packer for immutable AMIs. Migrated non-critical workloads to OpenStack bare-metal, cutting AWS from $24K to $12K monthly.</p>'
    },
    {
      tags: ['Kubernetes', 'NVIDIA GPU', 'CircleCI', 'Helm', 'Vault', 'Packer', 'OpenStack', 'Docker']
    }
  ]
};

const innovatetech: CaseStudy = {
  meta: 'INNOVATE TECH · TEAM LEAD · 2021 – 2024',
  title: 'Platform Engineering & Cloud Cost Optimisation',
  sections: [
    {
      type: 'diagram',
      heading: 'Architecture Overview',
      diagram: 'graph TB\n  subgraph GITOPS["GitOps Flow"]\n    GL[GitLab Repos] --> CI[Centralised CI]\n    CI --> SN[Snyk SAST]\n    CI --> TR[Trivy Scan]\n    CI --> AR[ArgoCD]\n    AR --> EKS[EKS Clusters]\n  end\n  subgraph EKS["EKS Platform"]\n    HP[HPA] --> SVC[Services]\n    KE[KEDA] --> SVC\n    IST[Istio Mesh] --> SVC\n    ESO[Ext Secrets] --> VA[Vault]\n  end\n  subgraph COST["FinOps"]\n    SP[Spot Instances] --> SAV[50% Savings]\n    RE[Reserved] --> SAV\n  end\n  CI --> EKS\n  AR --> ACCT[10+ AWS Accounts]'
    },
    {
      type: 'metrics',
      heading: 'Key Results',
      metrics: [
        { num: '50%', label: 'Cost Reduction' },
        { num: '10+', label: 'AWS Accounts' },
        { num: '6', label: 'Engineers Mentored' }
      ]
    },
    {
      type: 'timeline',
      heading: 'Implementation Phases',
      items: [
        { phase: 'Phase 1', desc: 'Centralised GitLab CI pipelines across all repos. Introduced shift-left security with Snyk and Trivy.' },
        { phase: 'Phase 2', desc: 'Built EKS platform with HPA, KEDA, Istio service mesh, and External Secrets Operator.' },
        { phase: 'Phase 3', desc: 'Spot instances, reserved capacity, right-sizing across 10+ AWS accounts. 50% cost reduction.' },
        { phase: 'Phase 4', desc: 'SOC2, ISO 27001, GDPR compliance. DR strategy with cross-region failover.' }
      ]
    },
    {
      tags: ['EKS', 'GitLab CI', 'ArgoCD', 'Istio', 'KEDA', 'HPA', 'Vault', 'Snyk', 'Trivy', 'FinOps']
    }
  ]
};

const cloudhero: CaseStudy = {
  meta: 'CLOUD HERO · SENIOR DEVOPS · 2023 – 2025',
  title: 'Multi-Cloud Kubernetes Migration',
  sections: [
    {
      type: 'diagram',
      heading: 'Architecture Overview',
      diagram: 'graph TB\n  subgraph SOURCES["Source Clouds"]\n    AWS[AWS] --> K8S\n    GCP[GCP] --> K8S\n    AZ[Azure] --> K8S\n    DO[DigitalOcean] --> K8S\n  end\n  subgraph K8S["Self-Hosted K8s on GCP"]\n    AN[Ansible Auto-Scaling] --> C1[Cluster 1]\n    AN --> C2[Cluster 2]\n    AN --> C20[Cluster 20+]\n    HM[Helm Blueprint] --> C1\n    HM --> C2\n  end\n  subgraph GATEWAY["API & Mesh"]\n    KONG[Kong Gateway] --> IST[Istio Mesh]\n    IST --> SVC[Microservices]\n  end\n  CI --> K8S\n  K8S --> GATEWAY'
    },
    {
      type: 'metrics',
      heading: 'Key Results',
      metrics: [
        { num: '20+', label: 'K8s Clusters' },
        { num: '4', label: 'Cloud Providers' },
        { num: '100%', label: 'Helm Adoption' }
      ]
    },
    {
      type: 'text',
      heading: 'The Solution',
      content: '<p>Multi-cloud migration across AWS, GCP, Azure, and DigitalOcean. Self-hosted Kubernetes on GCP with Ansible auto-scaling across 20+ clusters. Centralised Helm blueprint adopted company-wide. Kong API Gateway with Istio service mesh. Kyverno admission control with Trivy and Snyk.</p>'
    },
    {
      tags: ['Multi-Cloud', 'GCP', 'Kubernetes', 'Ansible', 'Helm', 'Kong', 'Istio', 'Kyverno', 'Trivy', 'Snyk']
    }
  ]
};

const zenledger: CaseStudy = {
  meta: 'ZENLEDGER · SENIOR DEVOPS · 2025 – PRESENT',
  title: 'Infrastructure Modernisation & Compliance',
  sections: [
    {
      type: 'diagram',
      heading: 'Architecture Overview',
      diagram: 'graph TB\n  subgraph EDGE["Edge Security"]\n    CF[Cloudflare] --> WAF[AWS WAF]\n    WAF --> ALB[App Load Balancer]\n  end\n  subgraph DB["Database"]\n    TS[TimescaleDB HA]\n    RDS[RDS PG 14] -->|"Zero-Downtime"| RDS2[RDS PG 15]\n    TS --> APP\n    RDS2 --> APP\n  end\n  subgraph NET["Zero Trust"]\n    CFT[CF Zero Trust] --> TS2[Tailscale]\n    TS2 --> VPC[VPC Peering]\n  end\n  subgraph OBS["Observability"]\n    PR[Prometheus] --> GR[Grafana]\n    AL[Alloy] --> PR\n    PR --> PD[PagerDuty]\n  end\n  ALB --> APP\n  APP --> OBS'
    },
    {
      type: 'metrics',
      heading: 'Key Results',
      metrics: [
        { num: '0', label: 'Downtime Minutes' },
        { num: 'SOC2', label: 'Compliance' },
        { num: '100%', label: 'Observability' }
      ]
    },
    {
      type: 'text',
      heading: 'The Solution',
      content: '<p>Migrated edge security to AWS WAF. HA TimescaleDB cluster with zero-downtime PG 14 to 15 migration. Cloudflare Zero Trust and Tailscale replacing legacy VPN. SOC2 and ISO 27001 to completion. Full observability with Prometheus, Grafana, Alloy, and PagerDuty.</p>'
    },
    {
      tags: ['AWS WAF', 'TimescaleDB', 'RDS', 'Cloudflare', 'Tailscale', 'Prometheus', 'Grafana', 'PagerDuty', 'SOC2', 'ISO 27001']
    }
  ]
};

const freelance: CaseStudy = {
  meta: 'FREELANCE · CONSULTANT · 2021 – PRESENT',
  title: 'Multi-Client Infrastructure Projects',
  sections: [
    {
      type: 'diagram',
      heading: 'Architecture Overview',
      diagram: 'graph TB\n  subgraph EVM["EVM Validators"]\n    EKS1[EKS] --> V1[Validator 1]\n    EKS1 --> V2[Validator 2]\n    EKS1 --> V3[HA Failover]\n  end\n  subgraph SF["Snowflake"]\n    SN[Snowflake] --> CC[Cross-Cloud]\n    CC --> A2[AWS]\n    CC --> G2[GCP]\n  end\n  subgraph AFT["AWS Accounts"]\n    AF[AFT] --> AC1[Account 1]\n    AF --> ACN[Account N]\n  end\n  subgraph ADV["Advanced"]\n    MI[Milvus]\n    LI[LitmusChaos]\n    CI[Cilium eBPF]\n  end'
    },
    {
      type: 'text',
      heading: 'EVM Validator Infrastructure',
      content: '<p>Built HA EVM node and validator infrastructure on EKS with automated failover and health monitoring across availability zones.</p>'
    },
    {
      type: 'text',
      heading: 'Snowflake & AWS AFT',
      content: '<p>Cross-cloud execution via Snowflake Container Services. AWS AFT for automated multi-account vending. Milvus vector storage, LitmusChaos testing, Cilium eBPF networking.</p>'
    },
    {
      tags: ['EKS', 'EVM', 'Snowflake', 'AWS AFT', 'Milvus', 'LitmusChaos', 'Cilium', 'eBPF', 'Multi-Region']
    }
  ]
};

export const caseStudies: CaseStudy[] = [idenTV, innovatetech, cloudhero, zenledger, freelance];
