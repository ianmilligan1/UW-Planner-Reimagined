export const STATUS_COLORS = {
  "On Track": { bg: "#DCFCE7", text: "#166534", dot: "#22C55E" },
  "Completed": { bg: "#DBEAFE", text: "#1E40AF", dot: "#3B82F6" },
  "Delayed": { bg: "#FEF3C7", text: "#92400E", dot: "#F59E0B" },
  "Not Started": { bg: "#F3F4F6", text: "#374151", dot: "#9CA3AF" },
  "At Risk": { bg: "#FEE2E2", text: "#991B1B", dot: "#EF4444" },
};

export const UNITS = [
  "VPRI-RO&I",
  "VP, Research & International",
  "Office of Research",
  "Graduate Studies & Postdoctoral Affairs",
  "Institutional Analysis & Planning",
  "Finance",
];

export const OBJECTIVES = [
  "All",
  "Financial Sustainability",
  "Research Excellence",
  "Research Partnerships",
  "Research Integrity",
  "Research Culture",
];

export const INITIAL_INITIATIVES = [
  {
    id: 1,
    title: "Develop a three-year financial plan",
    objective: "Financial Sustainability",
    unit: "VPRI-RO&I",
    collaboratingUnit: "Finance",
    endYear: "2026/27",
    status: "On Track",
    milestoneProgress: 45,
    description:
      "Create comprehensive financial roadmap aligned with institutional strategic priorities.",
    milestones: [
      { year: "2024/25", text: "Environmental scan and stakeholder consultation", done: true },
      { year: "2025/26", text: "Draft plan and budget modelling", done: true },
      { year: "2026/27", text: "Final plan approval and implementation", done: false },
    ],
  },
  {
    id: 2,
    title: "Implement Institutional Research Data Management (RDM) Strategy",
    objective: "Research Excellence",
    unit: "VPRI-RO&I",
    collaboratingUnit: "Office of Research",
    endYear: "2026/27",
    status: "On Track",
    milestoneProgress: 30,
    description:
      "Establish campus-wide RDM infrastructure meeting Tri-Agency requirements.",
    milestones: [
      { year: "2024/25", text: "RDM needs assessment completed", done: true },
      { year: "2025/26", text: "Institutional RDM strategy published", done: false },
      { year: "2026/27", text: "Full implementation and training rollout", done: false },
    ],
  },
  {
    id: 3,
    title: "Implement Campus-wide Task Force on Principles for Partnerships Recommendations",
    objective: "Research Partnerships",
    unit: "VPRI-RO&I",
    collaboratingUnit: "",
    endYear: "2026/27",
    status: "Delayed",
    milestoneProgress: 20,
    description:
      "Operationalize task force recommendations for ethical research partnerships.",
    milestones: [
      { year: "2024/25", text: "Task force report received", done: true },
      { year: "2025/26", text: "Implementation framework developed", done: false },
      { year: "2026/27", text: "Policy integration and compliance monitoring", done: false },
    ],
  },
  {
    id: 4,
    title: "Improve and establish Conflict of Interest (COI) in Research Processes",
    objective: "Research Integrity",
    unit: "VPRI-RO&I",
    collaboratingUnit: "",
    endYear: "2026/27",
    status: "On Track",
    milestoneProgress: 55,
    description:
      "Strengthen COI disclosure, review, and management processes across the institution.",
    milestones: [
      { year: "2024/25", text: "COI landscape review and gap analysis", done: true },
      { year: "2025/26", text: "New COI procedures and system pilot", done: true },
      { year: "2026/27", text: "Full rollout and annual reporting cycle", done: false },
    ],
  },
  {
    id: 5,
    title: 'Move Waterloo towards signing the "Declaration on Research Assessment"',
    objective: "Research Culture",
    unit: "VPRI-RO&I",
    collaboratingUnit: "Graduate Studies & Postdoctoral Affairs",
    endYear: "2026/27",
    status: "Not Started",
    milestoneProgress: 10,
    description: "Align institutional assessment practices with DORA principles.",
    milestones: [
      { year: "2025/26", text: "Consultation with faculties and Senate", done: false },
      { year: "2026/27", text: "Formal adoption and policy alignment", done: false },
    ],
  },
  {
    id: 6,
    title: "Implement Revenue Generation Projects (animal per diems and research ethics for-profit sponsors)",
    objective: "Financial Sustainability",
    unit: "VPRI-RO&I",
    collaboratingUnit: "",
    endYear: "2025/26",
    status: "Completed",
    milestoneProgress: 100,
    description:
      "Establish cost-recovery models for animal care and ethics review services.",
    milestones: [
      { year: "2024/25", text: "Fee schedule developed and approved", done: true },
      { year: "2025/26", text: "Billing system implemented", done: true },
    ],
  },
];
