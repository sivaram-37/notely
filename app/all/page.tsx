import AllNotes from "@/components/all-notes";
import Briefs from "@/components/briefs";
import { AnimatedPage } from "@/components/common/animated-page";
import CardWrapper from "@/components/common/cardWrapper";
import ToDoList from "@/components/to-do";
import UpcomingEvents from "@/components/upcoming-events";

export default function Home() {
  return (
    <AnimatedPage>
      <CardWrapper outerClassName="mt-3">
        <UpcomingEvents />
        <div className="mt-3 w-full flex gap-3">
          <AllNotes />
          <div className="w-full space-y-3">
            <Briefs />
            <ToDoList />
          </div>
        </div>
      </CardWrapper>
    </AnimatedPage>
  );
}
