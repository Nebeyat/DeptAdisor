import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query to get all departments or filter by stream
export const getDepartments = query({
  args: { stream: v.optional(v.string()) },
  handler: async (ctx, args) => {
    let departmentsQuery = ctx.db.query("departments");
    
    if (args.stream) {
      return await departmentsQuery
        .filter((q) => q.eq(q.field("stream"), args.stream))
        .collect();
    }
    
    return await departmentsQuery.collect();
  },
});

// Full combined dataset of unique departments (Natural Science & Social Science)
const ALL_DEPARTMENTS = [
  // --- Natural Science & Engineering ---
  { name: "Software Engineering", code: "SWE", stream: "Natural Science", description: "Focuses on the design, development, testing, and maintenance of software applications." },
  { name: "Information Technology", code: "IT", stream: "Natural Science", description: "Focuses on computer systems, networks, and database administration." },
  { name: "Computer Science", code: "CS", stream: "Natural Science", description: "Covers the theoretical foundations of computation, algorithms, and software development." },
  { name: "Information Systems", code: "IS", stream: "Natural Science", description: "Bridging business needs and technology solutions." },
  { name: "Cyber Security", code: "CYB", stream: "Natural Science", description: "Protecting systems, networks, and programs from digital attacks." },
  { name: "Information Technology Education", code: "ITED", stream: "Natural Science", description: "Training educators in IT pedagogy and technical fields." },
  { name: "Chemical Engineering", code: "ChE", stream: "Natural Science", description: "Processing raw materials into valuable chemical and physical products." },
  { name: "Food Engineering", code: "FE", stream: "Natural Science", description: "Applying engineering principles to food processing and manufacturing." },
  { name: "Human Nutrition", code: "HN", stream: "Natural Science", description: "Studying the metabolic and physiological responses of the body to diet." },
  { name: "Civil Engineering", code: "CE", stream: "Natural Science", description: "Designing and supervising infrastructure projects like roads and bridges." },
  { name: "Hydraulic and Water Resource Engineering", code: "HWRE", stream: "Natural Science", description: "Management and engineering of water flow, dams, and water systems." },
  { name: "Water Resource Engineering", code: "WRE", stream: "Natural Science", description: "Planning and developing sustainable water resource infrastructure." },
  { name: "Water Resource and Irrigation Engineering", code: "WRIE", stream: "Natural Science", description: "Agricultural water management and irrigation system design." },
  { name: "Computer Engineering", code: "CoE", stream: "Natural Science", description: "Integrating computer science and electronic engineering." },
  { name: "Electrical Engineering", code: "EE", stream: "Natural Science", description: "Studying electrical systems, power generation, and communications." },
  { name: "Mechanical Engineering", code: "ME", stream: "Natural Science", description: "Designing, analyzing, and manufacturing mechanical systems." },
  { name: "Industrial Engineering", code: "IE", stream: "Natural Science", description: "Optimizing complex processes, systems, and organizations." },
  { name: "Electromechanical Engineering", code: "EME", stream: "Natural Science", description: "Combining electrical and mechanical engineering principles." },
  { name: "Automotive Engineering", code: "AE", stream: "Natural Science", description: "Designing and manufacturing vehicle components and systems." },
  { name: "Aerospace Engineering", code: "ASE", stream: "Natural Science", description: "Development of aircraft and spacecraft." },
  { name: "Engineering Drawing and Design (BEd)", code: "EDD", stream: "Natural Science", description: "Technical drafting, design principles, and educational methods." },
  { name: "Materials Science and Engineering", code: "MSE", stream: "Natural Science", description: "Exploring properties and applications of engineering materials." },
  { name: "Construction Technology and Management (COTOM)", code: "COTOM", stream: "Natural Science", description: "Managing construction workflows, budgeting, and execution." },
  { name: "Architecture", code: "ARCH", stream: "Natural Science", description: "Planning, designing, and reviewing the construction of buildings." },
  { name: "Biomedical Engineering", code: "BME", stream: "Natural Science", description: "Applying engineering principles to medicine and biology." },
  { name: "Mechatronics (Robotics)", code: "MTR", stream: "Natural Science", description: "Combination of robotics, electronics, and computer control systems." },
  { name: "Textile Engineering", code: "TE", stream: "Natural Science", description: "Engineering principles applied to textile manufacturing processes." },
  { name: "Garment Engineering", code: "GE", stream: "Natural Science", description: "Apparel manufacturing technologies and industrial production." },
  { name: "Fashion Design", code: "FD", stream: "Natural Science", description: "Artistic design and creative styling of apparel and accessories." },

  // --- Social Science & Humanities ---
  { name: "Social Work", code: "SWK", stream: "Social Science", description: "Improving society and community well-being through social support and advocacy." },
  { name: "Educational Planning and Management", code: "EPM", stream: "Social Science", description: "Managing educational institutions, policies, and instructional programs." },
  { name: "Political Science and International Relations", code: "PSIR", stream: "Social Science", description: "Studying political systems, governance, and international diplomatic relations." },
  { name: "Journalism and Communication", code: "JCM", stream: "Social Science", description: "Mass media reporting, broadcasting, and public communication." },
  { name: "Geography & Environmental Studies", code: "GES", stream: "Social Science", description: "Analyzing spatial patterns, earth landscapes, and environmental dynamics." },
  { name: "Film & Media Arts", code: "FMA", stream: "Social Science", description: "Creative visual storytelling, videography, and media production." },
  { name: "Psychology", code: "PSY", stream: "Social Science", description: "Studying human behavior, mental processes, and psychological support." },
  { name: "Tourism and Hotel Management", code: "THM", stream: "Social Science", description: "Hospitality operations, tourism planning, and management." },
  { name: "Special Needs and Inclusive Education", code: "SNIE", stream: "Social Science", description: "Supporting inclusive learning environments and students with diverse needs." },
  { name: "Sociology", code: "SOC", stream: "Social Science", description: "Studying human social relationships, institutions, and society structures." },
  { name: "English Language and Literature", code: "ENG", stream: "Social Science", description: "Advanced study of English linguistics, literature, and critical writing." },
  { name: "History and Heritage Management", code: "HHM", stream: "Social Science", description: "Preserving cultural heritage, historical research, and museum management." },
  { name: "Early Childhood Care and Education", code: "ECCE", stream: "Social Science", description: "Child development and foundational early education pedagogy." },
  { name: "Marketing Management", code: "MKT", stream: "Social Science", description: "Promoting products, consumer behavior, and market strategy." },
  { name: "Accounting and Finance", code: "ACFN", stream: "Social Science", description: "Financial tracking, auditing, and corporate accounting." },
  { name: "Management", code: "MGMT", stream: "Social Science", description: "Organizational leadership, administration, and business strategy." },
  { name: "Economics", code: "ECON", stream: "Social Science", description: "Analyzing production, distribution, and consumption of wealth." },
  { name: "Cooperative Studies", code: "COOP", stream: "Social Science", description: "Managing cooperative business models and community-based enterprises." },
  { name: "Arabic", code: "ARB", stream: "Social Science", description: "Study of Arabic language, grammar, and literary traditions." },
  { name: "Afan Oromo", code: "AFO", stream: "Social Science", description: "Study of Afan Oromo language, literature, and cultural heritage." },
  { name: "Music", code: "MUS", stream: "Social Science", description: "Musical theory, performance, composition, and ethnomusicology." },
  { name: "Geez Language and Literature", code: "GEEZ", stream: "Social Science", description: "Classical Geez language, historical scripts, and literature studies." },
  { name: "Logistics and Supply Chain Management", code: "LSCM", stream: "Social Science", description: "Managing the flow of goods, information, and services." },
];

// Mutation to seed unique departments safely without duplicates
export const seedDepartments = mutation({
  args: {},
  handler: async (ctx) => {
    for (const dept of ALL_DEPARTMENTS) {
      const existing = await ctx.db
        .query("departments")
        .filter((q) => q.eq(q.field("name"), dept.name))
        .first();
      
      if (!existing) {
        await ctx.db.insert("departments", dept);
      }
    }
    return { success: true, message: "All departments seeded successfully!" };
  },
});