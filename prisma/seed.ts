import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed for Harish R Portfolio...');

  // 1. Admin Credentials Setup
  const defaultAdminUser = process.env.ADMIN_USERNAME || 'harish_admin';
  const defaultPassword = 'AdminPassword123!';
  const passwordHash = await bcrypt.hash(defaultPassword, 12);

  await prisma.adminUser.upsert({
    where: { username: defaultAdminUser },
    update: {},
    create: {
      username: defaultAdminUser,
      passwordHash: passwordHash,
      mustChangePassword: true,
    },
  });
  console.log(`✅ Admin user "${defaultAdminUser}" initialized (Default pwd: AdminPassword123!)`);

  // 2. Profile Setup
  await prisma.profile.deleteMany({});
  await prisma.profile.create({
    data: {
      name: 'Harish R',
      role: 'Machine Learning Engineer',
      tagline: 'SYSTEM ONLINE / HARISH R / MACHINE LEARNING ENGINEER / AI • DEEP LEARNING • COMPUTER VISION / I build intelligent systems that turn data, vision, and learning into real-world solutions.',
      biography: 'Passionate Machine Learning Engineer specializing in Deep Learning, Computer Vision, and Multimodal AI. Currently pursuing B.Tech in AI & ML at Sri Shakthi Institute Of Engineering And Technology, Coimbatore. Dedicated to researching and developing state-of-the-art intelligent systems, agentic architectures, and neural algorithms that bridge complex data and real-world impact.',
      location: 'Coimbatore, Tamil Nadu, India',
      focusAreas: JSON.stringify([
        'Computer Vision',
        'Deep Learning',
        'NLP',
        'LLMs',
        'Generative AI',
        'Agentic AI',
        'Multimodal AI',
        'Machine Learning',
        'AI Research',
      ]),
      profileImage: '/harish-profile.png',
      resumeUrl: '/resume-harish.pdf',
      availability: true,
    },
  });
  console.log('✅ Profile initialized.');

  // 3. Education Setup
  await prisma.education.deleteMany({});
  await prisma.education.create({
    data: {
      institution: 'Sri Shakthi Institute Of Engineering And Technology',
      degree: 'B.Tech',
      field: 'Artificial Intelligence & Machine Learning',
      semester: '5th Semester / 3rd Year',
      startYear: 2022,
      endYear: 2026,
      cgpa: 7.8,
      description: 'Specializing in core Machine Learning algorithms, Deep Neural Networks, Computer Vision architectures, Natural Language Processing, and Software Engineering principles.',
      orderIndex: 1,
    },
  });
  console.log('✅ Education initialized.');

  // 4. Skills Matrix Setup
  await prisma.skill.deleteMany({});
  const skillData = [
    // Strong
    { name: 'Python', category: 'Languages & Core', level: 'Strong', isFocusArea: true, orderIndex: 1, description: 'Primary language for ML modeling, PyTorch, NumPy, Pandas, and server logic.' },
    { name: 'Machine Learning', category: 'AI & ML Core', level: 'Strong', isFocusArea: true, orderIndex: 2, description: 'Supervised/unsupervised algorithms, evaluation metrics, feature engineering, model tuning.' },
    { name: 'OpenCV', category: 'Computer Vision', level: 'Strong', isFocusArea: true, orderIndex: 3, description: 'Real-time computer vision processing, image filters, contour analysis, video streams.' },
    // Intermediate
    { name: 'Deep Learning', category: 'Neural Networks', level: 'Intermediate', isFocusArea: true, orderIndex: 4, description: 'Convolutional networks, Transformer models, backpropagation, optimization routines.' },
    { name: 'NLP', category: 'Language Processing', level: 'Intermediate', isFocusArea: true, orderIndex: 5, description: 'Text tokenization, sentiment extraction, vector embeddings, TF-IDF, sequence models.' },
    // Currently Learning
    { name: 'LLMs', category: 'Generative AI', level: 'Learning', isFocusArea: true, orderIndex: 6, description: 'Large language model fine-tuning, prompt engineering, RAG pipelines, quantization.' },
    { name: 'Agentic AI', category: 'Autonomous Systems', level: 'Learning', isFocusArea: true, orderIndex: 7, description: 'Autonomous agent frameworks, tool-use planning, multi-agent systems, memory loops.' },
  ];

  for (const s of skillData) {
    await prisma.skill.create({ data: s });
  }
  console.log('✅ Skills Matrix initialized.');

  // 5. Featured Project Setup (VideoSense AI Case Study)
  await prisma.project.deleteMany({});
  await prisma.project.create({
    data: {
      title: 'VideoSense AI',
      subtitle: 'Multimodal Video Intelligence & Temporal Semantic Search Pipeline',
      description: 'An advanced video intelligence platform that automatically ingests raw video footage, extracts visual frames, runs OCR & speech transcription, and generates unified vector embeddings for frame-accurate natural language queries.',
      problem: 'Video archives are massive and opaque. Searching for exact visual moments, spoken dialogue, or text inside frames requires tedious manual scrubbing.',
      solution: 'VideoSense AI builds an end-to-end multimodal pipeline that synchronizes OCR, speech-to-text, and vision transformers into a fast vector index for real-time temporal search.',
      features: JSON.stringify([
        'Automatic scene boundary detection & keyframe extraction',
        'Whisper speech-to-text dialogue synchronization',
        'Deep OCR for text inside video frames',
        'Multimodal LLM context aggregation',
        'Sub-second semantic search down to exact video timestamps',
      ]),
      technology: JSON.stringify(['Python', 'OpenCV', 'PyTorch', 'Whisper API', 'LLM', 'Faiss', 'Next.js']),
      architecture: 'Microservices architecture with decoupled frame extraction workers, speech transcription queues, and a vector DB semantic index.',
      results: 'Achieved sub-500ms query retrieval across 10+ hours of high-definition video feeds with 94.2% temporal pinpoint accuracy.',
      githubUrl: 'https://github.com/harish02022007-sudo/VideoSense-AI',
      liveDemoUrl: 'https://videosense-ai.demo.app',
      images: JSON.stringify(['/images/projects/videosense-1.jpg', '/images/projects/videosense-2.jpg']),
      pipeline: JSON.stringify([
        { step: 'VIDEO', desc: 'Raw video stream ingestion' },
        { step: 'FRAME EXTRACTION', desc: 'Adaptive keyframe sampling via OpenCV' },
        { step: 'VISION MODEL', desc: 'Feature embedding extraction' },
        { step: 'OCR', desc: 'On-screen text recognition' },
        { step: 'SPEECH PROCESSING', desc: 'Audio track transcription' },
        { step: 'LLM', desc: 'Multimodal context synthesis' },
        { step: 'SEMANTIC SEARCH', desc: 'Vector database similarity indexing' },
      ]),
      tags: JSON.stringify(['Computer Vision', 'Multimodal AI', 'NLP', 'LLM', 'Deep Learning']),
      status: 'PUBLISHED',
      isFeatured: true,
      orderIndex: 1,
      date: '2024 - Present',
    },
  });
  console.log('✅ Projects initialized.');

  // 6. Research Lab Entries
  await prisma.research.deleteMany({});
  await prisma.research.create({
    data: {
      title: 'Multimodal Neural Ingestion & Agentic Search',
      question: 'How can dynamic cross-modal alignment reduce hallucination in spatial-temporal video reasoning?',
      description: 'Investigating lightweight cross-attention mechanisms that bind visual feature vectors with temporal audio transcripts to produce unified embeddings for autonomous agent reasoning.',
      approach: 'Leveraging zero-shot vision-language backbones paired with graph memory structures to construct spatial-temporal knowledge graphs during video ingestion.',
      currentStatus: 'Active research & experimental prototyping',
      futureDirection: 'Deploying real-time edge vision agent models capable of autonomous multi-camera monitoring and event detection.',
      tags: JSON.stringify(['Multimodal AI', 'Agentic AI', 'Computer Vision', 'Research']),
      status: 'PUBLISHED',
      orderIndex: 1,
    },
  });
  console.log('✅ Research entries initialized.');

  // 7. Social Links Setup
  await prisma.socialLink.deleteMany({});
  const socialLinks = [
    { platform: 'Email', url: 'mailto:harish02022007@gmail.com', icon: 'Mail', orderIndex: 1, isEnabled: true },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/harish-r-1a4089307', icon: 'Linkedin', orderIndex: 2, isEnabled: true },
    { platform: 'GitHub', url: 'https://github.com/harish02022007-sudo', icon: 'Github', orderIndex: 3, isEnabled: true },
    { platform: 'LeetCode', url: 'https://leetcode.com/u/R_Harish_2007/', icon: 'Code', orderIndex: 4, isEnabled: true },
  ];
  for (const s of socialLinks) {
    await prisma.socialLink.create({ data: s });
  }
  console.log('✅ Social links initialized.');

  // 8. Site Settings Setup
  await prisma.siteSetting.deleteMany({});
  await prisma.siteSetting.create({
    data: {
      key: 'visual_config',
      value: JSON.stringify({
        heroTagline: 'SYSTEM ONLINE / HARISH R / MACHINE LEARNING ENGINEER',
        accentColor: '#62E6FF',
        secondaryColor: '#9B7CFF',
        visualMode: 'HIGH', // HIGH | MEDIUM | LOW
        particleDensity: 'HIGH',
        enable3D: true,
        enableSound: false,
        sections: {
          intro: true,
          identity: true,
          journey: true,
          skills: true,
          projects: true,
          research: true,
          achievements: true,
          contact: true,
        },
      }),
    },
  });
  console.log('✅ Site settings initialized.');

  // 9. Timeline Entries
  await prisma.timelineEntry.deleteMany({});
  const timelineEntries = [
    { year: '2022', title: 'Foundations & B.Tech Admission', subtitle: 'Sri Shakthi Institute of Engineering and Technology', description: 'Began B.Tech in Artificial Intelligence & Machine Learning. Mastered Python, Linear Algebra, and Data Structures.', orderIndex: 1 },
    { year: '2023', title: 'Machine Learning & OpenCV', subtitle: 'Computer Vision & Core ML', description: 'Built core computer vision pipelines, image filters, and statistical machine learning classifiers.', orderIndex: 2 },
    { year: '2024', title: 'Deep Learning & Multimodal Exploration', subtitle: 'Neural Networks & NLP', description: 'Explored Deep Neural Networks, PyTorch, NLP embedding models, and initiated VideoSense AI research.', orderIndex: 3 },
    { year: '2025 - Present', title: 'LLMs & Agentic AI Research', subtitle: 'State of the Art AI Systems', description: 'Designing autonomous agent loops, prompt synthesis, and real-time multimodal intelligence applications.', orderIndex: 4 },
  ];
  for (const t of timelineEntries) {
    await prisma.timelineEntry.create({ data: t });
  }
  console.log('✅ Timeline initialized.');

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
