import AllNotes from "@/components/all-notes";
import Briefs from "@/components/briefs";
import CardWrapper from "@/components/common/cardWrapper";
import ToDo from "@/components/to-do";
import UpcomingEvents from "@/components/upcoming-events";

export default function Home() {
  return (
    <CardWrapper className="mt-3 bg-gray-100">
      <UpcomingEvents />
      <div className="mt-3 w-full flex gap-3">
        <AllNotes />
        <div className="w-full space-y-3">
          <Briefs />
          <ToDo />
        </div>
      </div>
    </CardWrapper>
  );
}
