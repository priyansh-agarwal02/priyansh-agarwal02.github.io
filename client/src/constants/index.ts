export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "experience",
    title: "Experience",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "skills",
    title: "Skills",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

export const experiences = [
  {
    title: "AI Research Engineer",
    company_name: "OpenTech Lab",
    icon: "https://images.unsplash.com/photo-1636728835759-735a3cb7d8d7",
    iconBg: "#383E56",
    date: "March 2022 - Present",
    points: [
      "Developed and fine-tuned large language models using LoRA, PEFT, and QLoRA techniques, achieving 40% better performance with 70% fewer resources",
      "Implemented RAG systems that improved information retrieval accuracy by 35% for domain-specific knowledge applications",
      "Built agentic AI systems using CrewAI and LangChain for autonomous task execution and decision-making",
      "Deployed and optimized production ML pipelines reducing inference time by 65% while maintaining model quality"
    ],
  },
  {
    title: "Machine Learning Engineer",
    company_name: "Data Insight Technologies",
    icon: "https://images.unsplash.com/photo-1638727764647-e97c166c62cc",
    iconBg: "#E6DEDD",
    date: "Jan 2021 - Feb 2022",
    points: [
      "Designed and implemented computer vision models for object detection and segmentation with 92% accuracy",
      "Created NLP pipelines for text classification and sentiment analysis on customer feedback data",
      "Built explainable AI dashboards using SHAP and LIME for model interpretability",
      "Collaborated with cross-functional teams to integrate ML solutions into existing products"
    ],
  },
  {
    title: "Data Science Intern",
    company_name: "AI Innovations",
    icon: "https://images.unsplash.com/photo-1638298272604-d71dbda8ff7d",
    iconBg: "#383E56",
    date: "Jun 2020 - Dec 2020",
    points: [
      "Analyzed large datasets using Python, SQL, and data visualization tools to extract actionable insights",
      "Developed predictive models for customer churn reduction, resulting in 18% decrease in attrition",
      "Built automated data pipelines to streamline ETL processes and reduce manual data handling",
      "Presented findings to stakeholders and created interactive dashboards for real-time monitoring"
    ],
  },
];

export const projects = [
  {
    name: "Autonomous LLM Agent Framework",
    description:
      "A comprehensive framework for creating autonomous AI agents that can perform complex tasks without human intervention. Built using CrewAI and LangChain for orchestration and decision-making capabilities.",
    tags: [
      {
        name: "CrewAI",
        color: "blue-text-gradient",
      },
      {
        name: "LangChain",
        color: "green-text-gradient",
      },
      {
        name: "Python",
        color: "pink-text-gradient",
      },
    ],
    image: "https://images.unsplash.com/photo-1620121692029-d088224ddc74",
    source_code_link: "https://github.com/priyansh-agarwal02/llm-agent-framework",
  },
  {
    name: "RAG Knowledge Base",
    description:
      "A Retrieval-Augmented Generation system that combines the power of language models with a specialized knowledge base to provide accurate, contextual responses for domain-specific applications.",
    tags: [
      {
        name: "PyTorch",
        color: "blue-text-gradient",
      },
      {
        name: "HuggingFace",
        color: "green-text-gradient",
      },
      {
        name: "Vector DB",
        color: "pink-text-gradient",
      },
    ],
    image: "https://images.unsplash.com/photo-1563089145-599997674d42",
    source_code_link: "https://github.com/priyansh-agarwal02/rag-knowledge-base",
  },
  {
    name: "LLM Fine-Tuning Platform",
    description:
      "An end-to-end platform for fine-tuning large language models using techniques like LoRA, PEFT, and QLoRA. Includes dataset preparation, training, evaluation, and deployment components.",
    tags: [
      {
        name: "PyTorch",
        color: "blue-text-gradient",
      },
      {
        name: "LoRA",
        color: "green-text-gradient",
      },
      {
        name: "PEFT",
        color: "pink-text-gradient",
      },
    ],
    image: "https://images.unsplash.com/photo-1496096265110-f83ad7f96608",
    source_code_link: "https://github.com/priyansh-agarwal02/llm-finetuning-platform",
  },
  {
    name: "AI Model Explainability Dashboard",
    description:
      "Interactive dashboard for visualizing and understanding AI model decisions using techniques like SHAP, LIME, and Grad-CAM to increase model transparency and trust.",
    tags: [
      {
        name: "SHAP",
        color: "blue-text-gradient",
      },
      {
        name: "Dash",
        color: "green-text-gradient",
      },
      {
        name: "Plotly",
        color: "pink-text-gradient",
      },
    ],
    image: "https://images.unsplash.com/photo-1488229297570-58520851e868",
    source_code_link: "https://github.com/priyansh-agarwal02/ai-explainability-dashboard",
  },
];
