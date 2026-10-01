import About from "./_sections/About";
import TechStack from "./_sections/TechStack";
import Writings from "./_sections/Writings";
import Experience from "./_sections/Experience";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-13">
      <About />
      <TechStack />
      <Writings />
      <Experience />
    </div>
  );
}
