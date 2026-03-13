import { Navbar }   from "@/components/portfolio/Navbar";
import { Hero }     from "@/components/portfolio/Hero";
import { About }    from "@/components/portfolio/About";
import { Projects } from "@/components/portfolio/Projects";
import { Skills }   from "@/components/portfolio/Skills";
import { Contact }  from "@/components/portfolio/Contact";
import { Footer }   from "@/components/portfolio/Footer";
import { educations } from "@/lib/data";
import { Education } from "@/components/portfolio/Education";
import {getAllProjects, getAllSkills} from "@/lib/db";




export default async function HomePage() {
  const projects = await getAllProjects();
  const skills   = await getAllSkills();

  const projectList = projects.map(p => ({ ...p, id: p._id.toString(), _id: undefined }));
  const skillList   = skills.map(s =>   ({ ...s, id: s._id.toString(), _id: undefined }));
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Education educations={educations} />
      <Projects projects={projectList} />
      <Skills skills={skillList} />
      <Contact />
      <Footer />
    </main>
  );
}
