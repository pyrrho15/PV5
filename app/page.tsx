import About from "./_sections/About";
import TechStack from "./_sections/TechStack";
import Writings from "./_sections/Writings";
import Experience from "./_sections/Experience";
import Projects from "./_sections/Projects";
import HireMe from "./_sections/HireMe";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-13">
      <About />
      <Experience />
      <TechStack />
      <Projects />
      <Writings />
      <HireMe />
    </div>
  );
}
