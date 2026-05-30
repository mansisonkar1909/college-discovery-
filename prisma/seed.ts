import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with updated schema...");

  // Clean up
  await prisma.savedCollege.deleteMany({});
  await prisma.account.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.college.deleteMany({});

  // Seed some realistic colleges
  const colleges = [
    {
      name: "Indian Institute of Technology, Bombay",
      slug: "iit-bombay",
      imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop&q=80",
      category: "Engineering",
      state: "Maharashtra",
      type: "GOVERNMENT",
      annualFees: 211000,
      avgPackage: 2180000,
      rating: 4.9,
      ranking: 3,
      established: 1958,
      website: "https://iitb.ac.in",
      description: "Indian Institute of Technology Bombay is a premier public research university and technical institute in Mumbai, India. Established in 1958, it is renowned for engineering education and research.",
      programs: JSON.stringify(["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Aerospace Engineering", "Data Science"]),
      facilities: JSON.stringify(["Main Library", "Hostels", "Gymkhana", "Convocation Hall", "High-Performance Computing Center"]),
    },
    {
      name: "Birla Institute of Technology and Science, Pilani",
      slug: "bits-pilani",
      imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop&q=80",
      category: "Engineering",
      state: "Rajasthan",
      type: "DEEMED",
      annualFees: 485000,
      avgPackage: 1820000,
      rating: 4.7,
      ranking: 20,
      established: 1964,
      website: "https://bits-pilani.ac.in",
      description: "BITS Pilani is a premier private deemed university in India. It focuses primarily on undergraduate education in engineering and sciences and is famous for its zero-attendance policy.",
      programs: JSON.stringify(["Computer Science", "Electronics & Instrumentation", "Chemical Engineering", "Physics", "Economics"]),
      facilities: JSON.stringify(["BITS Library", "Student Activity Center", "Vyas Bhavan", "Medical Center", "Cricket Ground"]),
    },
    {
      name: "Indian Institute of Science, Bangalore",
      slug: "iisc-bangalore",
      imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&h=400&fit=crop&q=80",
      category: "Science",
      state: "Karnataka",
      type: "GOVERNMENT",
      annualFees: 35000,
      avgPackage: 2800000,
      rating: 5.0,
      ranking: 1,
      established: 1909,
      website: "https://iisc.ac.in",
      description: "The Indian Institute of Science is a public deemed research university for higher education and research in science, engineering, design, and management, located in Bengaluru, India.",
      programs: JSON.stringify(["Physics", "Materials Engineering", "Aerospace Technology", "Neuroscience", "Computational Sciences"]),
      facilities: JSON.stringify(["J.R.D. Tata Memorial Library", "Supercomputing Facility", "National Nanofabrication Centre", "Gymnasium"]),
    },
    {
      name: "Delhi Technological University",
      slug: "dtu-delhi",
      imageUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=600&h=400&fit=crop&q=80",
      category: "Engineering",
      state: "Delhi",
      type: "AUTONOMOUS",
      annualFees: 190000,
      avgPackage: 1540000,
      rating: 4.5,
      ranking: 29,
      established: 1941,
      website: "https://dtu.ac.in",
      description: "Delhi Technological University (formerly Delhi College of Engineering) is a state university in New Delhi, India. It is one of India's oldest engineering colleges and has a massive campus.",
      programs: JSON.stringify(["Information Technology", "Software Engineering", "Mathematics & Computing", "Biotechnology", "Mechanical Engineering"]),
      facilities: JSON.stringify(["DCE Library", "OAT (Open Air Theatre)", "Indoor Sports Complex", "Hostels", "Computer Center"]),
    },
    {
      name: "Vellore Institute of Technology",
      slug: "vit-vellore",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop&q=80",
      category: "Engineering",
      state: "Tamil Nadu",
      type: "PRIVATE",
      annualFees: 198000,
      avgPackage: 920000,
      rating: 4.3,
      ranking: 11,
      established: 1984,
      website: "https://vit.ac.in",
      description: "VIT Vellore is a premier private university located in Vellore, Tamil Nadu. It is consistently ranked among the top private engineering institutions in India.",
      programs: JSON.stringify(["Computer Science & Engineering", "Information Technology", "Electronics & Communication", "Mechanical Engineering", "Biomedical Engineering"]),
      facilities: JSON.stringify(["Smart Classrooms", "Central Library", "Swimming Pool", "Hostels", "Food Courts"]),
    },
    {
      name: "Symbiosis Institute of Business Management",
      slug: "sibm-pune",
      imageUrl: "https://images.unsplash.com/photo-1590076214667-c063f9ef88f7?w=600&h=400&fit=crop&q=80",
      category: "Management",
      state: "Maharashtra",
      type: "PRIVATE",
      annualFees: 1050000,
      avgPackage: 2306000,
      rating: 4.6,
      ranking: 17,
      established: 1978,
      website: "https://sibm.edu",
      description: "SIBM Pune is a premier private business school situated in Pune, Maharashtra. Established in 1978, SIBM Pune is consistently ranked among the top 10 B-Schools in India.",
      programs: JSON.stringify(["Marketing MBA", "Finance MBA", "Human Resources MBA", "Operations MBA", "Innovation and Entrepreneurship"]),
      facilities: JSON.stringify(["Symbiosis Library", "Hilltop Campus Auditorium", "Computer Lab", "Residential Hostels", "Basketball Court"]),
    },
  ];

  for (const college of colleges) {
    const created = await prisma.college.create({
      data: college,
    });
    console.log(`Created college: ${created.name} (${created.type})`);
  }

  // Create test user for Google NextAuth flow
  const testUser = await prisma.user.create({
    data: {
      name: "Test User",
      email: "test@college.com",
    },
  });

  console.log(`Created test user: ${testUser.email}`);
  console.log("Seeding finished successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
