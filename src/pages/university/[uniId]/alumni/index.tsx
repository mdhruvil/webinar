import Navbar from "@/lib/components/Navbar";
import Meeting from "@/lib/components/Meeting";
import LearnMore from "@/lib/components/learnmore";
import Organise from "@/lib/components/Organiseanevent";

// import Organise from "@/lib/components/organise";

function index() {
  return (
    <>
      <Navbar />
      <Meeting />
      <LearnMore />
      <Organise />
    </>
  );
}

export default index;
