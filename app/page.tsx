import About from "./_sections/About";
import TechStack from "./_sections/TechStack";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-15">
      <About />
      <TechStack />
    </div>
  );
}
